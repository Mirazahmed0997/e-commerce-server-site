const reviews = require('../../Models/V0/review.model/review.model.js');
const productService=require('../Product.Service/Product.service.js')

const createReview=async(reqData,user)=>
{
    const product= await  productService.findProductById(reqData.productId);

    const Review = new reviews({
        user:user._id,
        product:product._id,
        review:reqData.review,
        createdAt:new Date()
    }) 

    await product.save()
    return await Review.save();
}

const getAllReview=async(productId)=>
{
    const product= await productService.findProductById(reqData.productId)
    return await reviews.find({product:productId}).populate('user')
}

module.exports={
    createReview,
    getAllReview
}