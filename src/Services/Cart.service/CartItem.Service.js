const cartItems = require('../../Models/V0/Cart.model/CartItems.model');
const userService = require('../User.service/user.service.js')

const updateCartItem = async (userId, cartItemId, cartItemData) => {
    try {
        const item = await findCartItemById(cartItemId)

        if (!item) {
            throw new Error("cart item not found :", cartItemId)
        }

        const user = await userService.findUserById(item.userId);
        if (!user) {
            throw new Error("user not found : ", userId)
        }

        if (user._id.toString() === userId.toString()) {
            item.qunatity = cartItemData.qunatity
            item.price = item.quantity * item.product.price
            item.discountedPrice = item.quantity * item.product.discountedPrice
            const updatedCartItem = await item.save();
            return updateCartItem;
        }
        else {
            throw new Error('You Cant update this')
        }

    } catch (error) {
        throw new Error(error.message)
    }
}


const removeCartItem = async (userId, cartItemId) => {
    const cartItem = await findCartItemById(cartItem)
    const user = await userService.findUserById(userId)

    if (user._id.toString() === cartItem.userId.toString()) {
        await cartItems.findByIdAndDelete(cartItemId)
    }
    else {
        throw new Error("Can't delete")
    }
}

const findCartItemById = async (cartItemId) => {
    const cartItem = await cartItems.findById(cartItemId)
    if(cartItem)
    {
        return cartItem
    }
    else{
        throw new Error("Cart item cant found with this id : ", cartItemId)
    }
}

module.exports={
    updateCartItem,removeCartItem,findCartItemById
}

