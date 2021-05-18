const express= require('express')
const axios = require('axios')
const router = express.Router()
const product=require('../models/Product')
const { spawn } = require('child_process');
const childPython = spawn('python',['--version']);
const history = require('../models/History')
const fs = require('fs')
router.get("/getAllProducts",async (req,res)=>{
    console.log("in get")
    var x=await product.find()
    console.log(x)
    res.send({"data":x})

})
router.get("/getProductsAccToCategoryId",async (req,res)=>{
    
    var x= await product.find({

        categoryId:req.query.categoryId
        
    })
    
    res.send({"data":x})
})



router.post("/getRecommendedProducts",async(req,res)=>{
    var arr=[];
    var allProducts= await product.find()
    var fs = require('fs');
    var allProds = []
    // var data = {}
    // data.table = []
    // for(var x in allProducts)
    // {
    //     //console.log(typeof(allProducts[x]));
    //     //console.log("a"+allProducts[x]);
    //     data.table.push(allProducts[x]);
    //     allProds.push(allProducts[x]);

    // }
    history.find().populate('userId').populate('productId').exec((err,data)=>{
        if(err){
            res.status(400).send(err)
        }
        data.forEach((value)=>{
            
            if(value.userId._id == req.body.userId)
            {
                arr.push(value.productId.productName);
            }
        })
        // var input = JSON.stringify({
        //     "allProducts":(allProducts),
        //     "viewedProductNames":(arr)
        //   });
        //   input = input.replace(/\\/g, "");
          //commitout.push(input);
        //arr = JSON.parse(arr);
        
        var t={
            "allProducts":allProducts,
            "viewedProductNames":arr
        }
    //console.log(JSON.parse(input));
        axios.post('http://localhost:8000/api/recommend/',t
        // ,{
        //     headers: {
        //         Accept: "application/json, text/plain, */*",
        //         "Content-Type": "application/json"
        //     }
        // } 
        )
            .then((response)=>{
                console.log(response);
                
                res.send(response)
            },(error)=>{
                console.log(error);
                res.send(error)
            });
          
        // console.log("all")
        // console.log(allProducts)
        //   console.log("arr")
        // console.log(arr)
    })
    //var dataToSend;
    // spawn new child process to call the python script
    // var allProducts= await product.find()
    // var fs = require('fs');
    // var allProds = []
    // var data = {}
    // data.table = []
    // for(var x in allProducts)
    // {
    //     //console.log(typeof(allProducts[x]));
    //     //console.log("a"+allProducts[x]);
    //     data.table.push(allProducts[x]);
    //     allProds.push(allProducts[x]);

    // }
    // console.log("printing arr");
    // console.log(arr);
    // fs.writeFile ("input.json", JSON.stringify(data), function(err) {
    //     if (err) throw err;
    //     //console.log('complete');
    //     }
    // );
    //console.log(allProducts)
    
    
    // var fs = require('fs');
 
    // const python = spawn('python',['recommendProducts.py',allProducts,arr]);
    // // collect data from script
    // python.stdout.on('data', function (data){
    //  console.log('Pipe data from python script ...');
    //  dataToSend = data.toString();
    // });
    // // in close event we are sure that stream from child process is closed
    // python.on('close', (code) => {
    // console.log(`child process close all stdio with code ${code}`);
    // // send data to browser
    // console.log(dataToSend);
    
    // });
    
})

module.exports=router