const mongoose=require("mongoose")
const express=require("express")
const dotenv=require("dotenv").config()
const bodyParser=require("body-parser")
const userRouter=require("./controller/user")
const productRouter=require("./controller/product")
const server=express()
server.use(express.json())
server.use(bodyParser.urlencoded({extended : true}));
server.use("/user",userRouter)
server.use("/product",productRouter)
mongoose.connect(process.env.MONGO_DB,(err)=>{
    if(!err){
        console.log(`Database Connected Successfully`)
    }else{
        console.log(err)
    }
})
server.listen(process.env.PORT,(err)=>{
    if(!err){
        console.log(`server connected on port ${process.env.PORT}`)
    }else{
        console.log(err)
    }
})