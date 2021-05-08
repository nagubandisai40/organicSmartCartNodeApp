const mongoose = require('mongoose')
const User = require('./User')
const Product = require('./Product')
const {Address} = require('./Address')

const Cart = mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref: 'User'},
    productId: {type: mongoose.Schema.Types.ObjectId, ref:'Product'},
    purchasedDate: {type:Date, default: Date.now},
    deliveryAddress: {type: Address,required:true} 
})

module.exports = mongoose.model('Cart',Cart)