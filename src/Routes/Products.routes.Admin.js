const express= require("express")
const router= express.Router();

const productController= require('../Controller/Product.Controller.js');
const authentication  = require("../MiddleWare/Authentication.js");

router.post("/",authentication, productController.createProduct)
router.post("/creates",authentication, productController.createMultipleProducts)
router.delete("/:id",authentication, productController.deleteProduct)
router.put("/:id",authentication, productController.updateProduct)

module.exports=router