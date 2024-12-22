const mongoose = require("mongoose")
const { type } = require("os")
const { title } = require("process")



const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discountedPrice: { type: Number, required: false },
    discountedPersent: { type: Number, required: false },
    stockQuantity: { type: Number, required: false },
    brand: { type: String, required: false },
    color: { type: String, required: false },
   
    sizes: [{
        name:{type:String},
        sizeQuantity:{type:Number}
    }],

    imageUrl:{type:String},
    ratings:{type: mongoose.Schema.Types.ObjectId, ref: "ratings", required: false},
    reviews:{type: mongoose.Schema.Types.ObjectId, ref: "reviews", required: false},
    numbOfRatings: { type: Number, default: 0 },
    category:{type: mongoose.Schema.Types.ObjectId, ref: "categories", required: false},
    createdAt:{type:Date,default:Date.now()},
})

const products = mongoose.model("products", productSchema)

module.exports = products 