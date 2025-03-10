const express = require('express');
const Route = express.Router();
const CategoryCtl = require('../../controller/CategoryCtl/CategoryCtl')

Route.get('/',CategoryCtl.AddCategory)
Route.post('/InsertCategory',CategoryCtl.InsertCategory)
Route.get('/viewCategory',CategoryCtl.ViewCategory)
Route.get('/DeleteCategory',CategoryCtl.DeleteCategory)
Route.get('/UpdateCategory/:id',CategoryCtl.UpdateCategory)
Route.post('/EditCategory',CategoryCtl.EditCategory)
Route.get("/changeStatus", CategoryCtl.changeStatus);
Route.get("/changeStatusTrue", CategoryCtl.changeStatusTrue);
Route.use('/subcategory',require('./SubCategoryRoute'))
module.exports = Route