const mongoose = require('mongoose');
const ExtraCategorySchema = mongoose.Schema({
    extracategory: {
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
    }
})

const ExtraCategory = mongoose.model('ExtraCategory', ExtraCategorySchema)
module.exports = ExtraCategory
