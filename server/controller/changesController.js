const User = require("../model/userModel");
const bcrypt=require('bcrypt')

const handleupdateName=async(req,res)=>{
    if(req.body == undefined){
        return res.status(400).json({status:false,message:"request is undefined"})
    } 

    try {
        let {_id}=req.payload
        let {name}=req.body;
     
      let user= await User.findById(_id);
      if(user.name == name){
        return res.status(400).json({message:"name should not be equal to old one"})
      }
     let updateduser= await User.updateOne({_id},{$set:{name:name}})
      return res.status(201).json({message:"user name updated successfully",updateduser})

        
        
    } catch (error) {
        return res.status(500).json({message:"server side error"})
        
    }
}

const handleupdatePassword=async(req,res)=>{
    if(req.body == undefined){
      return res.status(400).json({message:"request is undefined"})
    }
    try {
      const {_id}=req.payload;
      const {oldpassword,newpassword}=req.body
      let userdetails=await User.findById(_id)

      let oldhashed=await bcrypt.compare(oldpassword,userdetails.password)
      if(!oldhashed){
        return res.status(400).json({message:"old password is invalid"})
      } 


      let newhashed=await bcrypt.hash(newpassword,10)
      
      await User.updateOne({_id},{$set:{password:newhashed}})
      return res.status(201).json({message:"password changed successfully"})

      
      

    } catch (error) {
      return res.status(500).json({message:"server side error"})
    }
}

module.exports={handleupdateName,handleupdatePassword}