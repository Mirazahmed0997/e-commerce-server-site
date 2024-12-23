const express= require("express")
const router= express.Router();

const ratingController=require('../Controller/Rating.controller.js');
const  authentication  = require("../MiddleWare/Authentication.js");

router.post("/creates",authentication,ratingController.createRating)
router.get("/product/:productId",authentication,ratingController.getAllRatings )

module.exports=router