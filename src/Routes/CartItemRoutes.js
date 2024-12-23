const express= require("express")
const router= express.Router();

const cartItemController= require("../Controller/CartItem.Controller.js");
const  authentication = require("../MiddleWare/Authentication.js");

router.put('/:id',authentication,cartItemController.updateCartItem)
router.put('/:id',authentication,cartItemController.removeCartItem)

module.exports=router