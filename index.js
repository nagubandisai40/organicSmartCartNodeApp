const express = require('express')
const bodyparser = require('body-parser')
const dotenv = require('dotenv')
var cors = require('cors')

dotenv.config()

const mongoose = require('mongoose')

const authRoute = require('./routes/auth')
const productsRoute = require('./routes/products')


const PORT = 3000;
const app = express()
app.use(cors())
app.use(bodyparser.json())
app.use('/api/user',authRoute)
app.use('/api/products',productsRoute)

mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true },err=>{
    if(err){
        console.log("Error in Connecting to database"+err)
    }else{
        console.log("Connected to Mongodb")
    }
})


app.listen(PORT,function(){
    console.log("Server running on localhost: "+PORT)
})