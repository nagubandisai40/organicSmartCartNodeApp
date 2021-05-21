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
    // var isAlreadyPresent=1;
    // console.log("--------------------------------------------------------------------------------------------------------");
    // await Cart.findOne({"userId":req.body.userId,"productId":req.body.productId},function(err,docs){
    //     if(err){
    //         console.log(err);
            
            
    //     }
    //     else{
    //         console.log(docs);
    //         if(docs==null)
    //         {
    //         isAlreadyPresent=0;
    //         console.log("not present"+req.body.productId["productName"]);
            
    //         }
            
    //     }
    // });
    
    //console.log(isAlreadyPresent);
    const result = await cart.save();
     res.status(200).send({
        "_id":result._id
     })
    // if(isAlreadyPresent==0)
    // {
    // const result = await cart.save();
    // res.status(200).send({
    //     "_id":result._id
    // })
    // }
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
    console.log(req.body.prodId);
    Cart.remove({productId:req.body.prodId},function(err,obj){
        if(err) {}//throw err;
        else{
            res.send("removed")
        }
        
       // console.log(obj)
        //console.log(obj.result.n + " document(s) deleted");
    });
    
})



module.exports = router