const express= require('express')
const router = express.Router()
const product=require('../models/Product')

router.get("/getAllProducts",async (req,res)=>{
    console.log("in get")
    var x=await product.find()
    console.log(x)
    res.send({"data":x})

})
router.get("/getProductsAccToCategoryId",async (req,res)=>{
    console.log(req.query.categoryId)
    console.log("1")
    var x= await product.find({

        categoryId:req.query.categoryId
        
    })
    
    res.send({"data":x})
})


module.exports=router