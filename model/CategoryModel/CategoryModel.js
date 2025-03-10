const mongoose = require('mongoose');
const CategorySchema = mongoose.Schema({
    category:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default: true
    },
    subcatagoryIds : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
        required: true
    }]
})

const Category = mongoose.model('Category',CategorySchema)
module.exports = Category
