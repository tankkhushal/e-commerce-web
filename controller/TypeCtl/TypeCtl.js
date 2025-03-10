const TypeModel = require('../../model/TypeModel/TypeModel')
const Category = require('../../model/CategoryModel/CategoryModel')
const SubCategory = require('../../model/CategoryModel/SubCategoryModel')
const ExtraCategory = require('../../model/CategoryModel/ExtraCategory')

module.exports.AddType = async (req, res) => {
    try {
        let CategoryList = await Category.find()
        let SubCategoryList = await SubCategory.find()
        let ExtraCategoryList = await ExtraCategory.find()
        res.render('Type/Addtype',{
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
module.exports.InsertType = async (req, res) => {
    try {
        console.log(req.body);
        await TypeModel.create(req.body)

        console.log("Data Added Successfully...");
        return res.redirect('back')
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}
module.exports.ViewType = async (req, res) => {
    try {
        let TypeData = await TypeModel.find().populate('categoryId').populate('subcategoryId').populate('extracategoryId').exec();
        return res.render('Type/ViewType',{
            TypeData
        })
    }
    catch (err) {
        console.log(err);
        return res.redirect('back')
    }
}

module.exports.UpdateType = async (req, res) => {
    try{
        let SingleType = await TypeModel.findById(req.params.id)
        res.render('Type/UpdateType',{
            SingleType
        })
    }
    catch (err) {
        console.error(err);
        return res.redirect('back');
    }
}
module.exports.EditType = async (req, res) => {
    try {
        let id = req.body.id
        let updateData = await TypeModel.findById(id)
        if (updateData) {
            await TypeModel.findByIdAndUpdate(id, req.body)
            res.redirect('/type/ViewType')
        }
        else {
            console.log('something went wrong');
            res.redirect('/back')
        }
    }

    catch (err) {
        console.log(err)
        return res.redirect('back')
    }
}
module.exports.DeleteType = async (req, res) => {
    try {
        let DeleteType = await TypeModel.findByIdAndDelete(req.query.id)
        if (DeleteType) {
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
        let catStatusUpdate = await TypeModel.findByIdAndUpdate(req.query.catId, { 'status': false });
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
        let catStatusUpdate = await TypeModel.findByIdAndUpdate(req.query.catId, { 'status': true });
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