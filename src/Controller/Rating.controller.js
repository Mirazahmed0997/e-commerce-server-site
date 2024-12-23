const ratingService= require("../Services/Rating.service/Rating.service.js")

const createRating=async(res,req)=>
{
    const user=req.user
    try {
        const Review=await ratingService.createRating(req.body,user)
        return res.status(201).send(Review)
        
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}
const getAllRatings=async(res,req)=>
{
    const productId=req.params.productId
    try {
        const Ratings=await ratingService.getProductsRating(productId)
        return res.status(201).send(Review)
        
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports={
    createRating,
    getAllRatings
}