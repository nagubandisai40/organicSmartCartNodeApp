const express = require('express')
const axios = require('axios')
const router = express.Router()
const product = require('../models/Product')
const history = require('../models/History')

router.get("/getAllProducts", async (req, res) => {
    console.log("in get")
    var x = await product.find()
    console.log(x)
    res.send({
        "data": x
    })

})
router.get("/getProductsAccToCategoryId", async (req, res) => {

    var x = await product.find({

        categoryId: req.query.categoryId

    })

    res.send({
        "data": x
    })
})



router.post("/getRecommendedProducts", async (req, res) => {
    var arr = [];
    console.log(req.body)
    var allProducts = await product.find();
    var map = new Map(); 
    await history.find().populate('userId').populate('productId').then(data => {
        data.forEach((value) => {
            console.log(value)
            if (value.userId._id == req.body.userId) {
                arr.push(value.productId.productName);
                console.log(typeof(value.date));
                //map.set((value.date),value.productId.productName)
            }
        })
    })
    arr=arr.slice(Math.max(arr.length - 5, 0))
    console.log(arr)
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
    //console.log(map)
    var temp;
    await axios.post("http://localhost:8000/api/recommend/", {
        "allProducts": allProducts,
        "viewedProductNames": arr
    }).then(response => {
        temp=response;
        // response.send(JSON.stringify(response.data))
    }).catch(error => {
        console.log(error)
    })
    console.log("##########################")
    console.log(temp)
    res.status(200).send({"data":JSON.parse(JSON.stringify(temp.data.recommendedProducts))})

    

    // console.log("THank You...")
    // res.status(400).send("Thank You");
})




module.exports = router