const Category = require('../../model/CategoryModel/CategoryModel')
const SubCategory = require('../../model/CategoryModel/SubCategoryModel')
const ExtraCategory = require('../../model/CategoryModel/ExtraCategory')
const Type = require('../../model/TypeModel/TypeModel')
const Brand = require('../../model/BrandModel/BrandModel')

module.exports.AddProduct = async (req, res) => {
    try {
        let CategoryList = await Category.find()
        let SubCategoryList = await SubCategory.find()
        let ExtraCategoryList = await ExtraCategory.find()
        let TypeList = await Type.find()
        let BrandLIst = await Brand.find()
        res.render('Products/AddProduct', {
            CategoryList,
            SubCategoryList,
            ExtraCategoryList,
            TypeList,
            BrandLIst
        })
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}
module.exports.InsertProduct = async (req, res) => {

    findCategory = await CategoryModel.findById(req.body.categoryId)
    findCategory.subcatagoryIds.push(AddSubCategory._id)
    await CategoryModel.findByIdAndUpdate(req.body.categoryId, findCategory)
    return res.redirect('back');
    
}