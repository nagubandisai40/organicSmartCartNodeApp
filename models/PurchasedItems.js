const mongoose = require('mongoose')


const PurchasedItems = mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId,ref:'User'},
    prodctId: {type:mongoose.Schema.Types.ObjectId,ref:'Product'},
    quantity: String,
    deliveryAddress: String,
    phoneNumber: String,
    amount: Number,
    purchasedDate:{type:Date,default:Date.now}
})


module.exports = mongoose.model('PurchasedItems',PurchasedItems)