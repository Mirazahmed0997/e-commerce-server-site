const orderService= require('../../Services/Order.Service/Order.Service.js')

const createOrder=async(req,res)=>
{
    const user=await req.user
    try {
        const createdOrder=await  orderService.createOrder(user,req.body)
        return res.status(201).send(createdOrder)
    } 
    catch (error) {
        return res.status(500).send({error:error.message})
    }
}
const findOrderById=async(req,res)=>
{
    const user=await req.user
    try {
        const createdOrder=await  orderService.findOrderById(req.params.id)
        return res.status(201).send(createdOrder)
    } 
    catch (error) {
        return res.status(500).send({error:error.message})
    }
}
const orderHistory=async(req,res)=>
{
    const user=await req.user
    try {
        const createdOrder=await  orderService.orderHistory(user._id)
        // console.log(createdOrder)
        return res.status(201).send(createdOrder)
    } 
    catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports={
    createOrder,
    findOrderById,
    orderHistory
}