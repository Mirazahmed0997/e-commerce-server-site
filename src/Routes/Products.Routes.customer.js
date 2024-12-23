const express= require("express")
const router= express.Router();

const productController= require('../Controller/Product.Controller.js');
const authentication = require("../MiddleWare/Authentication.js");


router.get('/',authentication,productController.getAllProducts)
router.get('/id/:id',authentication,productController.findProductById)

module.exports=router