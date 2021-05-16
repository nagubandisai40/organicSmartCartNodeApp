const express= require('express')
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
    var arr = []
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
        // console.log("arr")
        console.log(arr)
    })
    var dataToSend;
    // spawn new child process to call the python script
    var allProducts= await product.find()
    var fs = require('fs');
    var allProds = []
    var data = {}
    data.table = []
    for(var x in allProducts)
    {
        //console.log(typeof(allProducts[x]));
        //console.log("a"+allProducts[x]);
        data.table.push(allProducts[x]);
        allProds.push(allProducts[x]);

    }

    console.log(arr);
    fs.writeFile ("input.json", JSON.stringify(data), function(err) {
        if (err) throw err;
        console.log('complete');
        }
    );
    var fs = require('fs');
 
    const python = spawn('python',['recommendProducts.py',allProducts,arr]);
    // collect data from script
    python.stdout.on('data', function (data){
     console.log('Pipe data from python script ...');
     dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
    // send data to browser
    console.log(dataToSend);
    res.send(dataToSend)
    });
})

module.exports=router