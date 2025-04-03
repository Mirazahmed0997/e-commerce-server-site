const reviews = require('../../Models/V0/review.model/review.model.js');
const productService = require('../Product.Service/Product.service.js')

// const createReview=async(reqData,user)=>
// {
//     console.log(user)
//     const product= await  productService.findProductById(reqData.productId);

//     const Review = new reviews({
//         user:user._id,
//         product:product._id,
//         review:reqData.review,
//         createdAt:new Date()
//     }) 

//     await product.save()
//     return await Review.save();
// }


const createReview = async (reqData, user) => {
    console.log("User:", user); // Debug user
    console.log("Received Data:", reqData); // Debug data

    const product = await productService.findProductById(reqData.productId);

    if (!product) {
        throw new Error("Product not found"); // Handle invalid product ID
    }

    const Review = new reviews({
        user: user._id, // ✅ Ensure user ID is passed
        product: product._id,
        review: reqData.review,
        createdAt: new Date(),
    });

    return await Review.save(); // ✅ Save only the review
};

const getAllReview = async (productId) => {
    const product = await productService.findProductById(reqData.productId)
    // console.log("review products",product)
    return await reviews.find({ product: productId }).populate('user')
}

const deleteReview = async (reviewId) => {
    const review = await reviews.findByIdAndDelete(reviewId); // Find the review by ID
    if (!review) {
        throw new Error("Review not found"); // Handle case where the review doesn't exist
    }
    await reviews.findByIdAndDelete(reviewId); // Correctly delete the review by ID
    return "Review deleted successfully";
};


module.exports = {
    createReview,
    getAllReview,
    deleteReview
}