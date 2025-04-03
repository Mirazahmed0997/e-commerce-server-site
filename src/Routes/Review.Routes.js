const express= require("express")
const router= express.Router();

const reviewController=require('../Controller/Review.Controller.js');
const  authentication  = require("../MiddleWare/Authentication.js");

router.post("/creates",authentication,reviewController.createReview)
router.get("/product/:productId",authentication,reviewController.getAllReviews)
router.delete("/delete/:reviewId",authentication,reviewController.removeReviewItem)

module.exports=router