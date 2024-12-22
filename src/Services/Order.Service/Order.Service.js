const cartService = require('../Cart.service/Cart.Service.js')
const Address = require("../../Models/V0/address.model/address.model.js")

const createOrder = async (user, shippingAddress) => {
    let address
    if (shippingAddress._id) {
        let existAddress = await Address.findById(shippingAddress._id)
        address = existAddress
    }
    else{
        address= new Address(shippingAddress)
        address.user=user
        await address.save();

        user.addresses.push(address)
        await user.save();
    }

    const cart= await cartService.fundUserCart(user._id)
    const orderItems= []

    for(const item of cart.cartItems){
        const orderItem =new orderItems({
            price:item.price,
            product:item.product,
            quantity:item.quantity,
            size:item.size,
            userId:item.userId,
            discountedPrice :item.discountedPrice
        })

        const createdOrderItem= await orderItem.save();
        orderItems.push(createdOrderItem)
    }

    
}