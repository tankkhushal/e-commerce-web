const BrandModel = require('../../model/BrandModel/BrandModel')
const Category = require('../../model/CategoryModel/CategoryModel')
const SubCategory = require('../../model/CategoryModel/SubCategoryModel')
const ExtraCategory = require('../../model/CategoryModel/ExtraCategory')

module.exports.Addbrand = async (req, res) => {
    try {
        let CategoryList = await Category.find()
        let SubCategoryList = await SubCategory.find()
        let ExtraCategoryList = await ExtraCategory.find()
        res.render('Brand/AddBrand',{
            CategoryList,
            SubCategoryList,
            ExtraCategoryList
        })
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}
module.exports.Insertbrand = async (req, res) => {
    try {
        console.log(req.body);
        await BrandModel.create(req.body)

        console.log("Data Added Successfully...");
        return res.redirect('back')
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}
module.exports.Viewbrand = async (req, res) => {
    try {
        let BrandData = await BrandModel.find().populate('categoryId').populate('subcategoryId').populate('extracategoryId').exec();
        return res.render('Brand/ViewBrand',{
            BrandData
        })
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.Updatebrand = async (req, res) => {
    try{
        let SingleBrand = await BrandModel.findById(req.params.id)
        res.render('Brand/UpdateBrand',{
            SingleBrand
        })
    }
    catch (err) {
        console.error(err);
        return res.redirect('back');
    }
}
module.exports.Editbrand = async (req, res) => {
    try {
        let id = req.body.id
        let updateData = await BrandModel.findById(id)
        if (updateData) {
            await BrandModel.findByIdAndUpdate(id, req.body)
            res.redirect('/brand/Viewbrand')
        }
        else {
            console.log('something went wrong');
            res.redirect('back')
        }
    }

    catch (err) {
        console.log(err)
        return res.redirect('back')
    }
}
module.exports.Deletebrand = async (req, res) => {
    try {
        let DeleteBrand = await BrandModel.findByIdAndDelete(req.query.id)
        if (DeleteBrand) {
            console.log('Data deleted successfully');
            res.redirect('back')
        }
        else {
            console.log('Something went wrong');
            return res.redirect('back')
        }
    }
    catch (err) {
        console.error(err);
        return res.redirect('back');
    }
}

module.exports.changeStatus = async (req, res) => {
    try {
        console.log(req.query);
        let catStatusUpdate = await BrandModel.findByIdAndUpdate(req.query.catId, { 'status': false });
        if (catStatusUpdate) {
            return res.redirect('back');
        }
        else {
            console.log('Failed to update status')
            return res.redirect('back');
        }

    }
    catch (err) {
        console.log(err)
        return res.redirect('back');
    }
}
module.exports.changeStatusTrue = async (req, res) => {
    try {
        console.log(req.query);
        let catStatusUpdate = await BrandModel.findByIdAndUpdate(req.query.catId, { 'status': true });
        if (catStatusUpdate) {
            return res.redirect('back');
        }
        else {
            console.log('Failed to update status')
            return res.redirect('back');
        }

    }
    catch (err) {
        console.log(err)
        return res.redirect('back');
    }
}