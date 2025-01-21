const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    cartItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "cartItems", required: false }],
    totalPrice: { type: Number, required: true, default: 0 },
    totalItem: { type: Number, required: true, default: 0 },
    sizes: { type: Number, required: true, default: 0 },
    totalDiscountedPrice: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true, default: 0 },
})

const cart = mongoose.model("cart", cartSchema)

module.exports = cart 