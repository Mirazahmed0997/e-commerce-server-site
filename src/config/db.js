const mongoose  = require("mongoose");

const mongDBURL='mongodb+srv://chinatrade:chinatrade123321@cluster0.rxns1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connectDB=()=>{
    return mongoose.connect(mongDBURL);
}

module.exports={connectDB}