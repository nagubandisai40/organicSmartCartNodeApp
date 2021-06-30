const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {registerValidation, loginValidation} = require('../validations')


router.post("/register",async (req,res)=>{

    const {error} = registerValidation(req.body);

    if(error){
        return res.status(400).send(error.details[0].message)
    }
    
    
    const emailExists = await User.findOne({email:req.body.email})

    console.log(emailExists)

    if(emailExists!=null){
        return res.status(400).send("User with Email Already Exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password,salt)

    const user = new User({
        email: req.body.email,
        userName: req.body.userName,
        address: req.body.address,
        phone: req.body.phone,
        password: hashedPassword,
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        city:req.body.city,
        pincode:req.body.pincode
    })
    try{
        const savedUser = await user.save();
        res.status(200).send({userId:savedUser._id})
    }catch(err){
        res.status(400).send(err)
    }

})


router.post("/login",async (req,res)=>{

    const {error} = loginValidation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    const emailExists = await User.findOne({email:req.body.email})

    if(!emailExists){    
        return res.status(400).send("Email or Password is Wrong")
    }
    
    const validPass = await bcrypt.compare(req.body.password,emailExists.password);

    if(!validPass)
    {
        return res.status(400).send("Email or Password is Wrong")
    }

    const token = jwt.sign({_id: emailExists._id},process.env.TOKEN_SECRETE)
     console.log(emailExists.isAdmin)
    res.status(200).send({token:token,_id:emailExists._id,userName:emailExists.userName,email:emailExists.email,phone:emailExists.phone,isAdmin:emailExists.isAdmin})
})


router.post("/getprofile",async (req,res)=>{
    
    userId= req.body.userId;
    try{
        user = await User.find({_id:userId},{password:0});
        console.log("###")
        console.log(user)
        res.status(200).send(user);
    }catch(e){
        res.status(400).send("Something Went Wrong")
    }
    
})

module.exports = router