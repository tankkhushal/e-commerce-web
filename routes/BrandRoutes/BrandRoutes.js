const express = require('express')
const Routes = express.Router()
const BrandCtl = require('../../controller/BrandCtl/BrandCtl')

Routes.get('/',BrandCtl.Addbrand)
Routes.post('/Insertbrand',BrandCtl.Insertbrand)
Routes.get('/Viewbrand',BrandCtl.Viewbrand)
Routes.get('/Deletebrand',BrandCtl.Deletebrand)
Routes.get('/Updatebrand/:id',BrandCtl.Updatebrand)
Routes.post('/editbrand',BrandCtl.Editbrand)
Routes.get("/changeStatus", BrandCtl.changeStatus);
Routes.get("/changeStatusTrue", BrandCtl.changeStatusTrue);

module.exports = Routes
