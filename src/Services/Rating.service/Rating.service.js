const ratings = require('../../Models/V0/rating.model/rating.model.js');
const productService=require('../Product.Service/Product.service.js')

const createRating=async(reqData,user)=>
{
    const product= await  productService.findProductById(reqData.productId);

    const Rating = new ratings({
        user:user._id,
        product:product._id,
        rating:reqData.rating,
        createdAt:new Date()
    }) 

    return await Rating.save();
}

const getProductsRating=async(productId)=>
{
    return await ratings.find({product:productId})
}

module.exports={
    createRating,
    getProductsRating
}