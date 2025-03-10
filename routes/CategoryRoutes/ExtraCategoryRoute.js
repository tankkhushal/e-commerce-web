const express = require('express');
const Route = express.Router();
const ExtraCategoryCtl = require('../../controller/CategoryCtl/ExtraCategoryCtl')

Route.get('/',ExtraCategoryCtl.AddExtraCategory)
Route.post('/InsertExtraCategory',ExtraCategoryCtl.InsertExtraCategory)
Route.get('/ViewExtraCategory',ExtraCategoryCtl.ViewExtraCategory)
Route.get('/DeleteExtraCategory',ExtraCategoryCtl.DeleteExtraCategory)
Route.get('/UpdateExtraCategory/:id',ExtraCategoryCtl.UpdateExtraCategory)
Route.post('/EditExtraCategory',ExtraCategoryCtl.EditExtraCategory)
Route.get("/changeStatus", ExtraCategoryCtl.changeStatus);
Route.get("/changeStatusTrue", ExtraCategoryCtl.changeStatusTrue);
module.exports = Route