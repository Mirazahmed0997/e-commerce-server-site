const express= require("express")
const router= express.Router();

const cartController= require('../Controller/Cart.Controller.js');
const  authentication = require("../MiddleWare/Authentication.js");

router.get('/',authentication,cartController.findUserCart)
router.put('/add',authentication,cartController.addItemToCart)

module.exports=router