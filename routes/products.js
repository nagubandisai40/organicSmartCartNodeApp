const express = require('express')
const router = express.Router()
const fs = require('fs')
const verify = require('./validateToken')
const {
    productValidation
} = require('../validations')
const Product = require('../models/Product')
const path = require('path')


var multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname+'/productImages'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});


var upload = multer({
    storage: storage
});


// router.get("/", verify, (req, res) => {
//     res.send({
//         message: "Hello You are done with the login"
//     })
// })

router.post('/addProducts',upload.single('image'), async (req, res) => {
    
    console.log("###################################")
    console.log(req.file)

    const {
        error
    } = productValidation(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const product = new Product({
        productName: req.body.productName,
        
        description: req.body.description,
        price: req.body.price,
        categoryId: req.body.categoryId,
        categoryName: req.body.categoryName,
        seller: req.body.seller,
        tags: req.body.tags,
        image: '/productImages/'+req.file.originalname,
        measuringUnit:req.body.measuringUnit
    })

    try {
        const savedProduct = await product.save();
        console.log("Product Already Saved")
        res.status(200).send({
            productId: savedProduct._id
        })
    } catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router