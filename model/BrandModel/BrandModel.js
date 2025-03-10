const mongoose = require('mongoose');
const BrandSchema = mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    subcategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory'
    },
    extracategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExtraCategory'
    }
})

const Brand = mongoose.model('Brand', BrandSchema)
module.exports = Brand
