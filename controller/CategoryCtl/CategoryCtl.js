const CategoryModel = require('../../model/CategoryModel/CategoryModel')
const SubCategoryModel = require('../../model/CategoryModel/SubCategoryModel')
module.exports.AddCategory = (req, res) => {
    try {
        res.render('Category/AddCategory')
    }
    catch (err) {
        console.error(err);
        return res.redirect('back');
    }
}
module.exports.InsertCategory = async (req, res) => {
    try {
        console.log(req.body)
        if (req.body) {
            await CategoryModel.create(req.body)
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
module.exports.ViewCategory = async (req, res) => {
    try {
        let search = ''
        if (req.query.search) {
            search = req.query.search;
        }
        let page = 0;
        let perPage = 3;
        if (req.query.page) {
            page = req.query.page
        }
        let CategoryData = await CategoryModel.find({
            $or: [
                { category: { $regex: search,$options:'i' } }
            ]
        }).skip(page * perPage).limit(perPage)
        if (CategoryData) {
            res.render('Category/ViewCategory', {
                CategoryData,search,page
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
module.exports.DeleteCategory = async (req, res) => {
    try {

        let Catdata = await CategoryModel.findById(req.query.id)
        let FindsubcatData = await SubCategoryModel.findById(Catdata.subcatagoryIds)


        // let DeleteSubCatDa/ta = await SubCategoryModel.findByIdAndDelete(Catdata.subcatagoryIds)
        let DeleteCategoryData = await CategoryModel.findByIdAndDelete(req.query.id)
        if (DeleteCategoryData) {
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
module.exports.UpdateCategory = async (req, res) => {
    try {
        let singleCategory = await CategoryModel.findById(req.params.id)
        res.render('Category/UpdateCategory', {
            singleCategory
        })
    }
    catch (err) {
        console.error(err);
        return res.redirect('back');
    }
}
module.exports.EditCategory = async (req, res) => {
    try {
        let id = req.body.id
        let updateData = await CategoryModel.findById(id)
        if (updateData) {
            await CategoryModel.findByIdAndUpdate(id, req.body)
            res.redirect('/category/viewCategory')
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
module.exports.changeStatus = async (req, res) => {
    try {
        console.log(req.query);
        let catStatusUpdate = await CategoryModel.findByIdAndUpdate(req.query.catId, { 'status': false });
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
        let catStatusUpdate = await CategoryModel.findByIdAndUpdate(req.query.catId, { 'status': true });
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