const express = require('express')
const router = express.Router()
const history = require('../models/History')
const {historyValidation} = require('../validations')
const fs = require('fs')
const product = require('../models/Product')
const PurchasedItems = require('../models/PurchasedItems')
router.post('/saveUserHistory',async (req,res)=>{
    const {error} = historyValidation(req.body);

    if(error){
        return res.status(400).send(error.details[0].message)
    }

    const userId = req.body.userId
    const productId = req.body.productId
    console.log(productId)
    const hist = new history({
        userId:userId,
        productId:productId,
        
    })

    const result = await hist.save()

    res.status(200).send({"data":result._id})

})

router.post('/getHistory',async (req,res)=>{
    
    var arr = []
    history.find().populate('userId').populate('productId').exec((err,data)=>{
        if(err){
            res.status(400).send(err)
        }
        console.log(data)
        
        data.forEach((value)=>{
            
            if(value.userId._id == req.body.userId)
            {
                arr.push(value.productId);
            }
        })
        
        res.status(200).send({"data":arr})
    })
})

router.post('/getHistory1',async (req,res)=>{
    
    var x= await history.find({

        userId:req.params.userId
        
    })
    
    res.send({"data":x})

})



router.post('/yourOrders',async (req,res)=>{
    
    var arr = []
     PurchasedItems.find().populate('userId',"userName").populate('prodctId').exec((err,data)=>{
        if(err){
            res.status(400).send(err)
            console.log("Sending error")
        }
        // console.log(data)
        data.forEach((value)=>{  
            // console.log(value)
            if(value.userId._id == req.body.userId)
            {   
                arr.push(value);
            }
        })
        res.send(arr)
    })
})
module.exports = router