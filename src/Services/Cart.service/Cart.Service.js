const cart = require("../../Models/V0/Cart.model/Cart.model.js");
const cartItems = require("../../Models/V0/Cart.model/CartItems.model.js");
const products = require("../../Models/V0/product.model/product.model.js");

const createCart = async (user) => {

    try {
        const Cart = new cart({ user })

        const createdCart = await Cart.save();
        return createdCart;
    }

    catch (error) {
        throw new Error(error.message)
    }
}

const findUserCart = async (userId) => {

    try {
        let Cart = await cart.findOne({ user: userId })

        

        let CartItems = await cartItems.find({ cart: Cart._id }).populate("product")
        // console.log("cart items", CartItems)

        Cart.cartItems = CartItems;
            console.log("cart",CartItems)
        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totsalItem = 0;

        for (let cartItem of  Cart.cartItems) {
            // console.log(cartItem)
            totalPrice += cartItem.price;
            totalDiscountedPrice += cartItem.discountedPrice;
            totsalItem += cartItem.quantity
        }

        Cart.totalPrice = totalPrice
        Cart.totalItem = totsalItem
        Cart.discount = totalPrice - totalDiscountedPrice

        // console.log(Cart) 

        return Cart;

    } catch (error) {
        throw new Error(error.message)
    }
}

const addCartItem = async (userId, req) => {

    // console.log(userId)
    try {

        const Cart = await cart.findOne({ user: userId })
        // console.log(Cart)
        const product = await products.findById(req.productId)
        // console.log(product)
        const isPresent = await cartItems.findOne({ cart: Cart._id, product: product._id, userId })

        // console.log(isPresent)

        if (!isPresent) {
            const CartItem = new cartItems({
                product: product._id, 
                cart: Cart._id,
                quantity: req.quantity || 1,
                color: req.color,
                userId,
                size: req.size,
                discountedPrice: product.discountedPrice
            })

            const createdCartItem = await CartItem.save();
            // console.log(createdCartItem)
            Cart.cartItems.push(createdCartItem)
            await Cart.save()
            return "Item added to cart";
        }

    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    createCart, findUserCart, addCartItem
}