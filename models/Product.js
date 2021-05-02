const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    productName: String,
    description: String,
    price: Number,
    categoryId: Number,
    categoryName: String,
    seller: String,
    tags: String,
    image: String,
    measuringUnit: String,
    isAvailable: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Product', productSchema)