const User = require("../model/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const handleSignup = async (req, res) => {
  try {
    if (req.body == undefined) {
      return res.status(400).json({ message: "without data user cant be created" })
    }

    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: "provide all the fields" })
    }

    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: "with this email user already existed..." })
    }
    const handlepassword = await bcrypt.hash(password, 10) // for encryption salt argument must be passed

    await User.insertOne({ name, email, password: handlepassword })

    return res.status(201).json({ message: "user created successfully...🟢" })

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: "server side error occured once check the code" })
  }
}

const handleLogin = async (req, res) => {
  try {
    if(req.body == undefined){
      return res.status(400).json({status:false,message:"without details you cant login"})
    }

    const {email,password}=req.body
    if(!email || !password){
      return res.status(400).json({status:false,message:"input fields should not empty"})
    }

    const isUser= await User.findOne({email})
    if(!isUser){
      return res.status(400).json({status:false,message:"with this email user not existed"})
    }

    const dehash=await bcrypt.compare(password,isUser.password)
    if(!dehash){
      return res.status(400).json({status:false,message:"password is invalid"})
    }
    const payload={_id:isUser.id,email}
    const token=jwt.sign(payload, "MERN")
    return res.status(200).json({status:true,message:"Login Successful",token})



  } catch (error) {
    return res.status(500).json({status:false,message:"server side error"})
  }
}

const getuserInfo=async(req,res)=>{
    const {_id}=req.payload 
               // req.payload contain payload in obj
  try {
    let user=await User.findById({_id},{password:0}); // we use projection for excluding password
    return res.status(200).json({status:true,user})
  } catch (error) {
    return res.status(500).json({status:false,message:"server side error"})
  }
}

const handlepassword=async(req,res)=>{
  if(req.body == undefined){
    return res.status(400).json({message:"with details password cant be changed",status:false})
  }
  try {
    const {email,newpassword,confirmpassword}=req.body
    
    if(!email || !newpassword || !confirmpassword){
      return res.status(400).json({message:"fields must not be empty",status:false})
    }

    const isuser=await User.findOne({email})
    if(!isuser){
      return res.status(400).json({message:"email is not exists in database",status:false})
    }

    if(newpassword !== confirmpassword){
      return res.status(400).json({message:"newpassword and confirmpassword mustbe equal",status:false})
    }

    let olddehash=await bcrypt.compare(newpassword,isuser.password)
    if(olddehash){
      return res.status(400).json({message:"newpassword must be different",status:false})
    }
    
    const hashedpassword=await bcrypt.hash(confirmpassword,10)
    await User.updateOne({email},{$set:{password:hashedpassword}})
    return res.status(201).json({message:"password changed successfully",status:true})

    
  } catch (error) {
    return res.status(500).json({message:"server side error",status:false})
  }
}

module.exports = { handleSignup, handleLogin ,getuserInfo,handlepassword}