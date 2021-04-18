const express = require('express')
const router = express.Router()
const verify = require('./validateToken')

router.get("/",verify,(req,res)=>{
    res.send({message:"Hello You are done with the login"})
})

module.exports = router