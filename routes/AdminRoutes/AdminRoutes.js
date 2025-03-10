const express = require('express');
const Route = express.Router();
const AdminCtl = require('../../controller/AdminCtl/AdminCtl')
const AdminModel = require('../../model/AdminModel/AdminModel');
const Admin = require('../../model/AdminModel/AdminModel');

//Dashboard
Route.get('/',AdminCtl.Login)
Route.get('/verifie',AdminCtl.VerifieEmail)
Route.get('/forgot-password',AdminCtl.forgot_password)
Route.get('/recover-password',AdminCtl.recoverpasword)
Route.get('/dashboard', AdminCtl.Dashboard)

// ADmin DatA Add and View Admin Routing
Route.get('/addAdmin', AdminCtl.AddAdmin)
Route.post('/InsertAdmin', AdminModel.uploadImage, AdminCtl.InsertAdmin)
Route.get('/viewAdmin', AdminCtl.ViewAdmin)


// Delete Admin Routing
Route.get('/deleteData', AdminCtl.DeleteData)

// Update Page and Edit Admin Routing
Route.get('/update/:id', AdminCtl.update)
Route.post('/EditAdmin', AdminModel.uploadImage, AdminCtl.EditAdmin)

//Category
Route.use('/category',require('../CategoryRoutes/CategoryRoutes'))

// TypeRoute
Route.use('/type',require('../TypeRoutes/TypeRoutes'))

// Brand Route
Route.use('/brand',require('../BrandRoutes/BrandRoutes'))

// Products Route
Route.use('/product',require('../ProductRoutes/ProductsRoutes'))

module.exports = Route
