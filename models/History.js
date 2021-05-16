const mongoose = require('mongoose')

const HistorySchema = mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
    date:{type:Date,default:Date.now}
})

module.exports = mongoose.model('History',HistorySchema)