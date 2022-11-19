const mongoose=require("mongoose")
const userSchema=new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      email:{
        type:String,
        required:true,
        unique:true
      },
      password:{
        type:String,
        required:true
      },
      phone: {
        type: String,
        uniquie:true,
        required:true
      },
      address:{
        type:String,
      }
})
const userModel=mongoose.model("user",userSchema)
module.exports=userModel