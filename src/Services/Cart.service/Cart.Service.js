const cart = require("../../Models/V0/Cart.model/Cart.model.js");
const cartItems = require("../../Models/V0/Cart.model/CartItems.model.js");
const products = require("../../Models/V0/product.model/product.model.js");

const createCart = async (user) => {

    try {
        const cart = new cart({ user })

        const createdCart = await cart.save();
        return createdCart;
    }

    catch (error) {
        throw new Error(error.message)
    }
}

const findUserCart = async (userId) => {
    try {
        let Cart = await cart.findOne({ user: user })

        let CartItems = await cartItems.find({ cart: cart._id }).populate("product")

        cart.CartItems = CartItems;

        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totsalItem = 0;

        for (let cartItem of cart.CartItems) {
            totalPrice += cartItem.price;
            totalDiscountedPrice += cartItem * discountedPrice;
            totsalItem += cartItem.quantity
        }

        cart.totalPrice = totalPrice
        cart.totsalItem = totsalItem
        cart.discount = totalPrice - totalDiscountedPrice

        return Cart;

    } catch (error) {
        throw new Error(error.message)
    }
}

const addCartItem = async (userId, req) => {
    try {
        const Cart = await cart.findOne({ user: userId })
        const product = await products.findById(req.productId)

        const isPresent = await cartItems.findOne({ cart: cart._id, product: product._id, userId })

        if (!isPresent) {
            const cartItem = new cartItems({
                product: product._id,
                cart: cart._id,
                quantity: 1,
                userId,
                size: req.size,
                discountedPrice: product.discountedPrice,
            })

            const createdCartItem = await cartItems.save();
            Cart.cartItems.push(createdCartItem)
            await Cart.save()
            return "Item added to cart";
        }

    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    createCart, findUserCart,addCartItem
}