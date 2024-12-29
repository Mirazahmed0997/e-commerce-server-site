const cartService = require('../Cart.service/Cart.Service.js')
const Address = require("../../Models/V0/address.model/address.model.js")
const order = require('../../Models/V0/Order.model/order.model')
const path = require('path')
const { populate } = require('../../Models/V0/Cart.model/Cart.model')
const OrderItem = require('../../Models/V0/Order.model/orderItems.js')

const createOrder = async (user, shippingAddress) => {
    let address
    // console.log(user,shippingAddress)
    if (shippingAddress._id) {
        let  existAddress = await Address.findById(shippingAddress._id)
        address = existAddress
        console.log(existAddress)
    }
    else {
        address = new Address(shippingAddress)
        address.user = user
        await address.save();

        user.addresses.push(address)
        await user.save();
    }

    const cart = await cartService.findUserCart(user._id)
    // console.log(user.firstName,"Cart.......",cart)
    let orderItems = []

    for (const item of cart.cartItems) {
        // console.log(user.firstName,"Items.....",item)
        const orderItem = new OrderItem({
            price: item.Price,
            product: item.product,
            quantity: item.quantity,
            size: item.size,
            userId: item.userId,
            discountedPrice: item.discountedPrice
        })

        // console.log("Orderrrr....",OrderItem)

        const createdOrderItem = await orderItem.save();
        // console.log("CreatedOrders.......",createdOrderItem)
        orderItems.push(createdOrderItem)
        // console.log("itemsss",OrderItems)
    }

    const createdOrder = new order({
        user,
        orderItems,
        totalPrice: cart.totalPrice,
        totalDiscountedPrice: cart.totalDiscountedPrice,
        discount: cart.discount,
        totalItem: cart.totalItem,
        shippingAddress: address,
    })

    // console.log("ordersItemsss....",createdOrder)

    const savedOrder = await createdOrder.save();
    return savedOrder
}

const placeOrder = async (orderId) => {
    const order = await findOrderById(orderId)

    order.orderStatus = "PLACED"
    order.paymentDetails.status = "COMPLETED"

    return await order.save()
}
const comfirmedOrder = async (orderId) => {
    const order = await findOrderById(orderId)

    order.orderStatus = "CONFIRMED"
    return await order.save()
}
const shippedOrder = async (orderId) => {
    const order = await findOrderById(orderId)

    order.orderStatus = "SHIPPED"
    return await order.save()
}
const deliveredOrder = async (orderId) => {
    const order = await findOrderById(orderId)

    order.orderStatus = "DELIVERED"
    return await order.save()
}


const cancelOrder = async (orderId) => {
    const order = await findOrderById(orderId)

    order.orderStatus = "CANCELED"
    return await order.save()
}

const findOrderById = async (orderId) => {
    const Order = await order.findById(orderId)
        .populate("user")
        .populate({ path: "orderItems", populate: { path: "product" } })
        .populate("shippingAddress")

       

    return Order;
}

const orderHistory = async (userId) => {
    try {
        const orders = await order.find({ user: userId, orderStatus: "PLACED" })
            .populate({ path: "orderItems", populate: { path: "product" } }).lean()

        return orders;

    } catch (error) {
        throw new Error(error.message)
    }
}
const getAllOrder = async () => {
    const allOrders = await order.find()
        .populate({ path: "orderItems", populate: { path: "product" } }).lean()

    return allOrders;
}


const deleteOrder=async(orderId)=>
{
    const Order= await findOrderById(ordeId);
    await order.findByIdAndDelete(Order._id)
}

module.exports={
    createOrder,
    placeOrder,
    comfirmedOrder,
    shippedOrder,
    deliveredOrder,
    cancelOrder,
    findOrderById,
    orderHistory,
    getAllOrder,
    deleteOrder

}