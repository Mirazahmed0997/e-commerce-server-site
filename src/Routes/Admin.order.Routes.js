const express= require("express")
const router= express.Router();

const adminOrderController=require("../Controller/adminOrderController.js");
const authentication  = require("../MiddleWare/Authentication.js");

router.get('/',authentication,adminOrderController.getAllOrders )
router.put('/:orderId/confirmed',authentication,adminOrderController.ConfirmedOrders)
router.put('/:orderId/delivered',authentication,adminOrderController.DeliveredOrder)
router.put('/:orderId/cancelled',authentication,adminOrderController.cancelOrder)
router.put('/:orderId/deleted',authentication,adminOrderController.deleteOrder)
router.put('/:orderId/shipped',authentication,adminOrderController.shippedOrder)

module.exports=router