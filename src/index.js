const express = require("express")

const cors = require("cors")

const app = express()

app.use(express.json())

app.use(cors())

app.get("/", (req, res) => {
    return res.status(200).send({ message: "Welcome to china Trade server", status: true })
})

const authrouters= require("./Routes/authRoute.js")
app.use('/auth',authrouters);

const userRouters= require('./Routes/userRoute.js')
app.use('/api/users',userRouters)

const productsRouter= require('./Routes/Products.Routes.customer.js')
app.use('/api/products',productsRouter)

const adminProductsRouter= require('./Routes/Products.routes.Admin.js')
app.use('/api/admin/products',adminProductsRouter)

const cartRouter= require('./Routes/CartRoutes.js')
app.use('/api/cart',cartRouter)

const cartItemRouter= require('./Routes/CartItemRoutes.js')
app.use('/api/cart_items',cartItemRouter)

const orderRouter= require('./Routes/orderRoutes.js')
app.use('/api/orders',orderRouter)

const adminOrderRouter= require('./Routes/Admin.order.Routes.js')
app.use('/api/admin/orders',adminOrderRouter)

const reviewsRouter= require('./Routes/Review.Routes.js')
app.use('/api/reviews',reviewsRouter)

const ratingRouters= require('./Routes/Rating.Routes.js')
app.use('/api/ratings',ratingRouters )

module.exports = app;

