const mongoose= require("mongoose")
const { type } = require("os")

const userSchema= mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true},
    role:{type:String,required:true,default:"customer"},
    mobile:{type:String,required:false},
    addresses:[
        {type:mongoose.Schema.Types.ObjectId, ref:"addresses"}
    ],
    paymentInformation:[
        {type:mongoose.Types.ObjectId, ref:"payment_information"}
    ],
    reatings:[
        {type:mongoose.Schema.Types.ObjectId, ref:"ratings"}
    ],
    reviews:[
        {type:mongoose.Schema.Types.ObjectId, ref:"reviews"}
    ],
    createdAt:{type:Date, default:Date.now()}
})

const user= mongoose.model("users",userSchema);
module.exports=user;