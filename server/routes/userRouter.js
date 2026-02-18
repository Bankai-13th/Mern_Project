const express=require('express')
const { handleSignup,handleLogin,getuserInfo,handlepassword } = require('../controller/userController')
const verifytoken=require('../middlewares/verifytoken')
const userRouter=express.Router()

userRouter.post("/signup",handleSignup)
userRouter.post("/login",handleLogin)
userRouter.get("/",verifytoken,getuserInfo)
userRouter.patch("/forgotpassword",handlepassword)


module.exports=userRouter