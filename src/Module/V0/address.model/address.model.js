const mongoose= require("mongoose")
const { type } = require("os")

const addressSchema= new mongoose.Schema({
    firstName:{type:String, required:true},
    lastName:{type:String, required:true},
    streetAddress:{type:String, required:true},
    city:{type:String, required:true},
    state:{type:String, required:false},
    zipCode:{type:Number, required:false},
    mobile:{type:Number, required:false},

    user:{type:mongoose.Schema.ObjectId,ref:"users"},
})

const address= mongoose.model("addresses", addressSchema)

module.exports=address

