const express = require('express')
const Routes = express.Router()
const TypeCtl = require('../../controller/TypeCtl/TypeCtl')

Routes.get('/',TypeCtl.AddType)
Routes.post('/InsertType',TypeCtl.InsertType)
Routes.get('/ViewType',TypeCtl.ViewType)
Routes.get('/DeleteType',TypeCtl.DeleteType)
Routes.get('/UpdateType/:id',TypeCtl.UpdateType)
Routes.post('/edittype',TypeCtl.EditType)
Routes.get("/changeStatus", TypeCtl.changeStatus);
Routes.get("/changeStatusTrue", TypeCtl.changeStatusTrue);

module.exports = Routes
