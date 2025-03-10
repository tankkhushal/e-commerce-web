const express = require('express');
const Route = express.Router();
const SubCategoryCtl = require('../../controller/CategoryCtl/SubCategoryCtl')

Route.get('/',SubCategoryCtl.AddSubCategory)
Route.post('/InsertSubCategory',SubCategoryCtl.InsertSubCategory)
Route.get('/ViewSubCategory',SubCategoryCtl.ViewSubCategory)
Route.get('/DeleteSubCategory',SubCategoryCtl.DeleteSubCategory)
Route.get('/UpdateSubCategory/:id',SubCategoryCtl.UpdateSubCategory)
Route.post('/EditSubCategory',SubCategoryCtl.EditSubCategory)
Route.get("/changeStatus", SubCategoryCtl.changeStatus);

Route.get("/changeStatusTrue", SubCategoryCtl.changeStatusTrue);
Route.use('/extracategory',require('./ExtraCategoryRoute'))
module.exports = Route