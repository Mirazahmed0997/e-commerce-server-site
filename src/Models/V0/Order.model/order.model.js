const { default: mongoose } = require("mongoose")

const { type } = require("os")

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    orderItems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'orderItems' }],
    orderDate: { type: Date, required: false },
    deliveryDate: { type: Date },
    shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: 'addresses' },

    paymentDetails: {
        paymentMethod: {
            type: String,
        },
        transactionId: {
            type: String,
        },
        paymentId: {
            type: String,
        },
        paymentStatus: {
            type: String,
            default: "PENDING"
        }
    },

    totalPrice: { type: Number, required: true },
    totalDiscountPrice: { type: Number, required: false },
    discount: { type: Number, required: true },
    orderStatus: { type: String, required: true, default: "PENDING" },
    totalItem: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now()},
});

const order = mongoose.model('orders', orderSchema)
module.exports = order