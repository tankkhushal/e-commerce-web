const mongoose = require('mongoose');
const SubCategorySchema = mongoose.Schema({
    subcategory:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default: true
    },
    categoryId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    extracategoryId : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ExtraCategory'
    }]
})

const SubCategory = mongoose.model('SubCategory',SubCategorySchema)
module.exports = SubCategory
