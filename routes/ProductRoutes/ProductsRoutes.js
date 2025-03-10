const express = require('express')
const Routes = express.Router()
const ProductCtl = require('../../controller/ProductCtl/ProductaCtl')

Routes.get('/',ProductCtl.AddProduct)

module.exports = Routes
