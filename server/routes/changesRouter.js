const express=require('express')
const changesRouter=express.Router()
const {handleupdateName,handleupdatePassword}=require('../controller/changesController')
const verifytoken=require('../middlewares/verifytoken')


changesRouter.patch('/name',verifytoken,handleupdateName)
changesRouter.patch('/password',verifytoken,handleupdatePassword)

module.exports=changesRouter