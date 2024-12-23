const express= require("express")
const router= express.Router();

const orderController= require('../Controller/Order.Controller/Order.Controller.js');
const  authentication  = require("../MiddleWare/Authentication.js");

router.post('/', authentication,orderController.createOrder)
router.get('/ordered', authentication,orderController.orderHistory)
router.get('/:id', authentication,orderController.findOrderById)

module.exports=router