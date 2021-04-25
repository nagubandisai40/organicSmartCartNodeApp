const express = require('express')
const router = express.Router()
const verify = require('./validateToken')
const {productValidation} = require('../validations')
const Product = require('../models/Product')

router.get("/",verify,(req,res)=>{
    res.send({message:"Hello You are done with the login"})
})

router.post('/addProducts', async (req,res)=>{
    const {error} = productValidation(req.body)
    
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    const product = new Product({
        productName: req.body.productName,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        categoryId: req.body.categoryId,
        categoryName: req.body.categoryName,
        seller: req.body.seller,
        tags: req.body.tags
    })

    try{
        const savedProduct = await product.save();
        console.log("Product Already Saved")
        res.status(200).send({productId:savedProduct._id})
    }catch(err){
        res.status(400).send(err)
    }
})

module.exports = router