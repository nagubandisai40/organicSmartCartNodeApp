const express = require('express')
const router = express.Router()
const history = require('../models/History')
const {historyValidator} = require('../validations')

router.post('/saveUserHistory',async (req,res)=>{
    const {error} = historyValidator(req.body);

    if(error){
        return res.status(400).send(error.details[0].message)
    }

    const userId = req.body.userId,
    const productId = req.body.productId

    const hist = new history({
        userId:userId,
        producId:productId
    })

    const result = await hist.save()

    res.status(200).send({"data":result._id})

})

router.post('/getHistory',async (req,res)=>{
    
    const arr = []
    history.find().populate('userId').populate('productId').exec((err,data)=>{
        if(err){
            res.status(400).send(err)
        }
        data.forEach((value,index)=>{
            if(value.userId._id == req.body.userId)
            {
                arr.push(value);
            }
        })
    })

    res.status(200).send({"data":arr})

})



module.exports = router