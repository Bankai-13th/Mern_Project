const jwt = require("jsonwebtoken")
const verifytoken=async(req,res,next)=>{
    const bearertoken=req.headers.authorization; //request.headers contain authorization , have barer token with "barer token"

    if(!bearertoken){
        return res.status(401).json({status:false,message:"Access Denied, Access token required"})
    }

    const token=bearertoken.split(" ")[1]
    try {
       const payload=jwt.verify(token,"MERN")  // jwt.verify returns payload obj
        req.payload=payload;
       
        next()
      
       
    } catch (error) {
        return res.status(403).json({status:false,message:"Invalid or Expired Token"})
    }

}
module.exports=verifytoken