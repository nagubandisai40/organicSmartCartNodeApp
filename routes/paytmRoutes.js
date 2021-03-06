const express = require('express')
const router = express.Router()
const https = require('https')
const qs = require('querystring')
// Middleware for body parsing
const PurchasedItems = require('../models/PurchasedItems')
const parseUrl = express.urlencoded({
    extended: false
})
const parseJson = express.urlencoded({
    extended: false
})
const checksum_lib = require('../paytm/checksum')
const config = require('../paytm/config')


router.post('/payment',async (req, res) => {

    if (!req.body.amount || !req.body.email || !req.body.phone) {
        res.status(400).send("Payment Failed")
    }

    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    console.log(req.body)

    const order = new PurchasedItems({
        userId: req.body.userId,
        prodctId: req.body.productId,
        quantity: req.body.quantity,
        deliveryAddress: req.body.deliveryAddress,
        phoneNumber: req.body.phone,
        amount: req.body.amount,
    })

     await order.save().then(val => {
        console.log("#################")
        console.log(val)
        var params = {};
        const orderId = val._id;
        params['MID'] = config.PaytmConfig.mid;
        params['WEBSITE'] = config.PaytmConfig.website;
        params['CHANNEL_ID'] = 'WEB';
        params['INDUSTRY_TYPE_ID'] = 'Retail';
        params['ORDER_ID'] = orderId.toString();
        params['CUST_ID'] = 'customer_001';
        params['TXN_AMOUNT'] = req.body.amount.toString();
        params['CALLBACK_URL'] = 'http://localhost:3000/api/paytm/callback';
        params['EMAIL'] = req.body.email;
        params['MOBILE_NO'] = req.body.phone.toString();
        checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {
            console.log(checksum)
            var paytmParams = {
                ...params,
                CHECKSUMHASH: checksum
            }
            console.log("Sending Response")
            res.json(paytmParams)
        });
    });
    console.log("------------");
    


})

router.get("/test", (req, res) => {
    res.send('<script>window.location.href="http://localhost:4200/";</script>');
})

router.post('/callback', async (req, res) => {

    var body = '';
    req.on('data', function (data) {
        console.log("Dataaa..........");
        console.log(data);
        body += data;
    });

    req.on('error', (err) => {
        console.log("@@@@@@@@@@@@@@")
        console.error(err.stack)
    })

    req.on('end', function () {
        console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%")
        var html = "";
        var post_data = qs.parse(body);

        // received params in callback
        console.log('Callback Response: ', post_data, "\n");

        // verify the checksum
        var checksumhash = post_data.CHECKSUMHASH;
        // delete post_data.CHECKSUMHASH;
        var result = checksum_lib.verifychecksum(post_data, config.PaytmConfig.key, checksumhash);
        console.log("Checksum Result => ", result, "\n");


        // Send Server-to-Server request to verify Order Status
        var params = {
            "MID": config.PaytmConfig.mid,
            "ORDERID": post_data.ORDERID
        };

        checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {

            params.CHECKSUMHASH = checksum;
            post_data = 'JsonData=' + JSON.stringify(params);

            var options = {
                hostname: 'securegw-stage.paytm.in', // for staging
                // hostname: 'securegw.paytm.in', // for production
                port: 443,
                path: '/merchant-status/getTxnStatus',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': post_data.length
                }
            };


            // Set up the request
            var response = "";
            var post_req = https.request(options, function (post_res) {
                post_res.on('data', function (chunk) {
                    response += chunk;
                });

                post_res.on('end', function () {
                    console.log('S2S Response: ', response, "\n");

                    var _result = JSON.parse(response);
                    if (_result.STATUS == 'TXN_SUCCESS') {
                        res.send('payment sucess')
                    } else {
                        res.send('payment failed')
                    }
                });
            });

            // post the data
            post_req.write(post_data);
            post_req.end();
        });
    });

    console.log(req.body)

    if (req.body.STATUS == "TXN_SUCCESS") {
        var temp = req.body.ORDERID.split("_")
        console.log(temp)
        const orderedItem = await PurchasedItems.findById(req.body.ORDERID);
        PurchasedItems.updateOne({_id:orderedItem._id},{$set:{transactionId: req.body.TXNID,transactionstatus: req.body.STATUS}},(error,response)=>{
            if(error)
            { 
                console.log("update failed");
                res.send("Payment Failed")
            }
            else
            { 
                console.log("update success");
                res.redirect("http://localhost:4200")
            }
        })
        
    } else {
        console.log("Trasanction status is mismatched")
    }

})



module.exports = router