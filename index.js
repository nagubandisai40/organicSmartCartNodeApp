const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
var cors = require('cors')
const path = require('path')

// childPython.stdout.on('data',(data)=>{
//     console.log(`stdout:${data}`);
// })


dotenv.config()

const mongoose = require('mongoose')

const authRoute = require('./routes/auth')
const productsRoute = require('./routes/products')
const paytmRoutes = require('./routes/paytmRoutes')
const cartRoutes = require('./routes/cartRoutes')
const historyRoutes = require('./routes/history')
const getAllProducts=require('./routes/getProduct')

const PORT = 3000;
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.use('/api/user',authRoute)
app.use('/api/product',productsRoute)
app.use('/api/paytm',paytmRoutes)
app.use('/productImages',express.static('routes/productImages'))
app.use('/api/cart',cartRoutes)
app.use('/api/history',historyRoutes)
app.use('/api/products',getAllProducts)

mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true, useUnifiedTopology: true },err=>{
    if(err){
        console.log("Error in Connecting to database"+err)
    }else{
        console.log("Connected to Mongodb")
    }
})

app.get('/',(req,res)=>{
    
    res.sendFile(path.join(__dirname+'/index.html'));
})



app.listen(PORT,function(){
    console.log("Server running on localhost: "+PORT)
})