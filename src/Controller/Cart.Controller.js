const cartService = require('../Services/Cart.service/Cart.Service.js')

const findUserCart = async (req, res) => {
    const user =await req.user;
    try {
        const cart= await cartService.findUserCart(user._id)
        return res.status(200).send(cart);

    } catch (error) {
      return  res.status(500).send({error:error.message})
    }
}
const addItemToCart = async (req, res) => {
    const userId =await req.user._id;
    
    // console.log(userId)
    try {
        const cartItem= await cartService.addCartItem(userId,req.body)
        return res.status(200).send(cartItem);

    } catch (error) {
      return  res.status(500).send({error:error.message})
    }
}

module.exports={
    findUserCart,
    addItemToCart
}