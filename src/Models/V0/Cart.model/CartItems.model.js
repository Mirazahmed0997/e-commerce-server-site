const mongoose = require("mongoose")

const cartItemsSchema = new mongoose.Schema({
    cart: { type: mongoose.Schema.Types.ObjectId, ref: 'cart', required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'products', required: true },
    size: { type: String, required: true },
    color: [{ type: String, required: true }],
    quantity: { type: Number, required: true, default: 1 },
    price: { type: Number, required: false },
    discountedPrice: { type: Number, required: true, defult:0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
})

const cartItems = mongoose.model("cartItems", cartItemsSchema)

module.exports = cartItems 