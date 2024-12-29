const mongoose = require("mongoose")



const orderItemsSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: false },
    size: { type: String },
    quantity: { type: Number, required: false },
    price: { type: Number, required: false},
    discountedPrice: { type: Number, required: false },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: false },
})

const orderItems = mongoose.model("orderItems", orderItemsSchema)

module.exports = orderItems 