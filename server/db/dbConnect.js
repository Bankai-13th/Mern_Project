const mongoose=require('mongoose')
 const connectdb=async()=>{
    try {
        await mongoose.connect("mongodb://localhost:27017/PROJECT")
        console.log("db connected")
    } catch (error) {
        console.log("db not connected",error)
    }
 }

 module.exports=connectdb