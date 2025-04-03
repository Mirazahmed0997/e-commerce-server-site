const reviewService = require("../Services/Review.Service/Review.service.js")

// const createReview=async(req,res)=>
// {
//     const user = req.user; 
//     console.log(user)
//     try {
//         const Review = await reviewService.createReview(req.body, user);
//         return res.status(201).send(Review)

//     } catch (error) {
//         return res.status(500).send({error:error.message})
//     }
// }

const createReview = async (req, res) => {
    try {
        const user = req.user; // ✅ Get user from request
        console.log("User Info:", user);

        const Review = await reviewService.createReview(req.body, user); // ✅ Pass user correctly
        return res.status(201).json(Review);

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const getAllReviews = async (res, req) => {
    const productId = req.params.productId
    try {
        const Review = await reviewService.getAllReview(productId)
        return res.status(201).send(Review)

    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const removeReviewItem = async (req, res) => {
    const user = await req.user;
    try {
        await reviewService.deleteReview(user._id, req.params.id)
        return res.status(200).send({ message: "Review item remove successfully" });
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

module.exports = {
    createReview,
    getAllReviews,
    removeReviewItem
}