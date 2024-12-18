const express = require("express")

const cors = require("cors")

const app = express()

app.use(express.json())

app.use(cors())

app.get("/", (req, res) => {
    return res.status(200).send({ message: "Welcome to china Trade server", status: true })
})

module.exports = app;

