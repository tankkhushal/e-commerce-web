const mongoose = require('mongoose');
const TypeSchema = mongoose.Schema({
    type: {
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

const Type = mongoose.model('Type', TypeSchema)
module.exports = Type
