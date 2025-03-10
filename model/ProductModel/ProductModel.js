const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price:{
        type:String,
        required:true
    },
    discount : {
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
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
    },
    typeId : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Type'
    },
    brandId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Brand'
    }
    
})

const Product = mongoose.model('Product', ProductSchema)
module.exports = Product
