const ExtraCategoryModel = require('../../model/CategoryModel/ExtraCategory')
const CategoryModel = require('../../model/CategoryModel/CategoryModel')
const SubCategoryModel = require('../../model/CategoryModel/SubCategoryModel')
module.exports.AddExtraCategory = async (req, res) => {
    try {
        let CategiryList = await CategoryModel.find()
        let SubCategiryList = await SubCategiryModel.find()
        res.render('ExtraCategory/AddExtraCategory',{
            SubCategiryList,
            CategiryList
        })
    }
    catch (err) {
        console.error(err);
        return res.redirect('back');
    }
}
module.exports.InsertExtraCategory = async (req, res) => {
    try {
        console.log(req.body)
        if (req.body) {
            let AddExtraCategory = await ExtraCategoryModel.create(req.body)
            let findSubCategory = '';
            findSubCategory = await SubCategiryModel.findById(req.body.subcategoryId)
            findSubCategory.extracategoryId.push(AddExtraCategory._id)
            await SubCategiryModel.findByIdAndUpdate(req.body.subcategoryId,findSubCategory)
            console.log('Category Data added successfully');
            return res.redirect('back')
        }
        else {
            console.log('something went wrong');
            return res.redirect('back')
        }

    }
    catch (err) {
        console.error(err);
        return res.redirect('back');
    }
}
module.exports.ViewExtraCategory = async (req, res) => {
    try {
        let extraCategoryData = await ExtraCategoryModel.find().populate('categoryId').populate('subcategoryId').exec();
        if (extraCategoryData) {
            res.render('ExtraCategory/ViewExtraCategory', {
                extraCategoryData
            })
        }
        else {
            console.log('No Category Data found');
            return res.redirect('back')
        }
    }
    catch (err) {
        console.error(err);
        return res.redirect('back');
    }
}
module.exports.DeleteExtraCategory = async (req, res) => {
    try {

        let ExtraCatData = await ExtraCategoryModel.findById(req.query.id);
        let findSubCatData = await SubCategoryModel.findById(ExtraCatData.subcategoryId);
        console.log(findSubCatData);
        let checkCatData = findSubCatData.extracategoryId.includes(req.query.id);
        if (checkCatData) {
            console.log(req.query.id);

            let removeMatchData = findSubCatData.extracategoryId.filter((v, i) => {
                if (!v.equals(req.query.id)) {
                    return v;
                }
            })
            findSubCatData.extracategoryId = removeMatchData;
            console.log(findSubCatData);
            await SubCategoryModel.findByIdAndUpdate(ExtraCatData.subcategoryId, findSubCatData)
        }

        let DeleteExtraCategoryData = await ExtraCategoryModel.findByIdAndDelete(req.query.id)
        if (DeleteExtraCategoryData) {
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
module.exports.UpdateExtraCategory = async (req, res) => {
    try{
        let ExtraCategoryData = await ExtraCategoryModel.findById(req.params.id)
            
            console.log(ExtraCategoryData);
        
        res.render('ExtraCategory/UpdateExtraCategory',{
            ExtraCategoryData
        })
    }
    catch (err) {
        console.error(err);
        return res.redirect('back');
    }
}
module.exports.EditExtraCategory = async (req, res) => {
    try {
        let id = req.body.id
        let updateData = await ExtraCategoryModel.findById(id)
        if (updateData) {
            await ExtraCategoryModel.findByIdAndUpdate(id, req.body)
            res.redirect('/category/subcategory/extracategory/ViewExtraCategory')
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
module.exports.changeStatus = async (req, res) => {
    try {
        console.log(req.query);
        let catStatusUpdate = await ExtraCategoryModel.findByIdAndUpdate(req.query.catId, { 'status': false });
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
        let catStatusUpdate = await ExtraCategoryModel.findByIdAndUpdate(req.query.catId, { 'status': true });
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