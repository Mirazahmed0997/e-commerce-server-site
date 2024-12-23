const orderService = require("../Services/Order.Service/Order.Service.js")

const getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrder();
        return res.status(200).send(orders)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const ConfirmedOrders = async (req, res) => {
    const orderId = req.params.orderId

    try {
        const orders = await orderService.comfirmedOrder(orderId);
        return res.status(200).send(orders)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}
const shippedOrder = async (req, res) => {
    const orderId = req.params.orderId

    try {
        const orders = await orderService.shippedOrder(orderId);
        return res.status(200).send(orders)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}
const DeliveredOrder = async (req, res) => {
    const orderId = req.params.orderId

    try {
        const orders = await orderService.deliveredOrder(orderId);
        return res.status(200).send(orders)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}
const cancelOrder = async (req, res) => {
    const orderId = req.params.orderId

    try {
        const orders = await orderService.cancelOrder(orderId);
        return res.status(200).send(orders)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}
const deleteOrder = async (req, res) => {
    const orderId = req.params.orderId

    try {
        const orders = await orderService.deleteOrder(orderId);
        return res.status(200).send(orders)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

module.exports={
    getAllOrders,
    ConfirmedOrders,
    shippedOrder,
    DeliveredOrder,
    cancelOrder,
    deleteOrder
}