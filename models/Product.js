const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: String,
    category: String,
    description: String,
    price: Number,
    categoryId: Number,
    categoryName: String,
    seller: String,
    tags: String
})

module.exports = mongoose.model('Product',productSchema)