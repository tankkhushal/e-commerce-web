const SubCategoryModel = require('../../model/CategoryModel/SubCategoryModel')
const ExtraCategoryModel = require('../../model/CategoryModel/ExtraCategory')
const CategoryModel = require('../../model/CategoryModel/CategoryModel')
module.exports.AddSubCategory = async (req, res) => {
    try {
        let CategoryList = await CategoryModel.find()
        res.render('SubCategory/AddSubCategory', {
            CategoryList
        })
    }
    catch (err) {
        console.error(err);
        return res.redirect('back');
    }
}
module.exports.InsertSubCategory = async (req, res) => {
    try {
        console.log(req.body)
        if (req.body) {
            let AddSubCategory = await SubCategoryModel.create(req.body)
            let findCategory = '';

            if (AddSubCategory) {
                console.log('SubCategory added successfully')
                findCategory = await CategoryModel.findById(req.body.categoryId)
                findCategory.subcatagoryIds.push(AddSubCategory._id)
                await CategoryModel.findByIdAndUpdate(req.body.categoryId, findCategory)
                return res.redirect('back');
            }
            else {
                console.log('Failed to add Blog')
                return res.redirect('back');
            }
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
module.exports.ViewSubCategory = async (req, res) => {
    try {
        let SubCategoryData = await SubCategoryModel.find().populate('categoryId').exec();
        if (SubCategoryData) {
            res.render('SubCategory/ViewSubCategory', {
                SubCategoryData
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
module.exports.DeleteSubCategory = async (req, res) => {
    try {
        //subcategory Data 
        let subcatData = await SubCategoryModel.findById(req.query.id);
        let findCatData = await CategoryModel.findById(subcatData.categoryId);
        console.log(findCatData);
        let checkCatData = findCatData.subcatagoryIds.includes(req.query.id);
        if (checkCatData) {
            console.log(req.query.id);

            let removeMatchData = findCatData.subcatagoryIds.filter((v, i) => {
                if (!v.equals(req.query.id)) {
                    return v;
                }
            })
            findCatData.subcatagoryIds = removeMatchData;
            console.log(findCatData);
            await CategoryModel.findByIdAndUpdate(subcatData.categoryId, findCatData)
        }

        let ExtraCatData = await ExtraCategoryModel.findById(subcatData.extracategoryId)
        console.log(ExtraCatData);
        
        if (ExtraCatData) {
            await ExtraCategoryModel.findByIdAndDelete(ExtraCatData._id)
        }

        let DeleteSubCategoryData = await SubCategoryModel.findByIdAndDelete(req.query.id)
        if (DeleteSubCategoryData) {
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
module.exports.UpdateSubCategory = async (req, res) => {
    try {
        let singleSubCategory = await SubCategoryModel.findById(req.params.id)
        res.render('SubCategory/UpdateSubCategory', {
            singleSubCategory
        })
    }
    catch (err) {
        console.error(err);
        return res.redirect('back');
    }
}
module.exports.EditSubCategory = async (req, res) => {
    try {
        let id = req.body.id
        let updateData = await SubCategoryModel.findById(id)
        if (updateData) {
            await SubCategoryModel.findByIdAndUpdate(id, req.body)
            res.redirect('/category/subcategory/ViewSubCategory')
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
        let catStatusUpdate = await SubCategoryModel.findByIdAndUpdate(req.query.catId, { 'status': false });
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
        let catStatusUpdate = await SubCategoryModel.findByIdAndUpdate(req.query.catId, { 'status': true });
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