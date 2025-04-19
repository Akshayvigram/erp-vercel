import jwt from "jsonwebtoken"
import User from "../models/User.js";
export const authMiddleware=async(req,res,next)=>{
    try {
        const token=req.headers.authorization.split(' ')[1];
    if(!token){
        return res.status(400).json({success:false,message:"token not provided"})
    }
    
    
    const decoded=jwt.verify(token,process.env.JWT_KEY);
    if(!decoded){
        return res.status(400).json({success:false,message:"token not found"})
    }
   
    
    const user=await User.findById({_id:decoded._id});
    if(!user){
        return res.status(400).json({success:false,message:"User not found"})
    }
    req.user=user;
    next();
    } catch (error) {
        console.log("error in auth middleware"+ error.message);
        
        return res.status(500).json({success:false,error:error.message})
    }

}
export default authMiddleware
