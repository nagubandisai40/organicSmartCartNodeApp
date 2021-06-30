const express = require('express')
const router = express.Router()
const User = require('../models/User')
const PurchasedItems = require("../models/PurchasedItems")
const moment = require('moment')
const product = require("../models/Product")

router.get("/getAllUsers",async (req,res)=>{
    try{
        var users = await User.find({},{password:0})
        //console.log(users)
        res.status(200).send(users)
    }catch(e)
    {
        res.status(400).send("Something went Wrong")
    }
})

router.post("/allProductsOrderedToday",async (req,res)=>{
    var curdate= new Date(req.body.date).toISOString()
    console.log(curdate)
    try{
        var products =await PurchasedItems.find({purchasedDate:{$gte:curdate}})
        res.status(200).send(products)
    }catch(e){
        res.status(400).send("Something went wrong");
    }
})

router.get("/allProducts",async (req,res)=>{
    try{
        const products=await product.find()
        res.status(200).send(products)
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})

router.post("/udateIsAvailale",async (req,res)=>{
    console.log("in update")
    var productId = req.body.productId;
    var isAvailable = req.body.isAvailable
    //console.log("in update")
    await product.findOne({_id:productId}).update({})
    await product.updateOne({_id:productId},{
        $set:{
            isAvailable:isAvailable
        }
    },(err,data)=>{
        if(err)
        {
            res.status(400).send(err)
            return;
        }
        res.status(200).send(data);

    })
})


router.post("/updatePrice",async (req,res)=>{
    var productId = req.body.productId
    var amount= req.body.amount
    console.log("be update price")
    await product.updateOne({_id:productId},{$set:{price:amount}},(err,data)=>{
        if(err)
        {
            res.status(400).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})



module.exports=router