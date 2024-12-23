const reviewService= require("../Services/Review.Service/Review.service.js")

const createReview=async(res,req)=>
{
    const user=req.user
    try {
        const Review=await reviewService.createReview(req.body,user)
        return res.status(201).send(Review)
        
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}
const getAllReviews=async(res,req)=>
{
    const productId=req.params.productId
    try {
        const Review=await reviewService.getAllReview(productId)
        return res.status(201).send(Review)
        
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports={
    createReview,
    getAllReviews
}