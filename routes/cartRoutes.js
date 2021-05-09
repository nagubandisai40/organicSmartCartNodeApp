const express = require('express');
const router = express.Router()
const Cart = require('../models/Cart')
const {cartValidation} = require('../validations')


router.post('/addCart',async (req,res)=>{
    const {error} = cartValidation(req.body)
    
    if(error){
        return res.status(400).send(error.details[0].message)
    }


    const cart = new Cart({
        userId: req.body.userId,
        productId: req.body.productId,
        
    })

    const result = await cart.save();
    res.status(200).send({
        "_id":result._id
    })
})

router.post("/cartItems", async (req,res)=>{
    var arr = []
    Cart.find().populate("userId","userName email phone").populate("productId").exec((err,cartData)=>{
        if(err){
            res.status(400).send("Something went wrong");
        }
        cartData.forEach((value,index)=>{
            console.log(value)
            if(value.userId._id==req.body.id)
                arr.push(value)
        })
        res.send(arr)
    })
    
})

router.post("/deleteCartItem",async (req,res)=>{
    Cart.remove({_id:req.body.prodId});
})



module.exports = router