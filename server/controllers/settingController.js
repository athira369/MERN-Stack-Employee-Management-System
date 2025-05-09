import User from "../models/User.js";
import bcrypt from 'bcrypt';

const changePassword = async(req,res) =>{
    try{

        const {oldPassword,newPassword,userId} = req.body;
        const user = await User.findById({_id:userId})
        if(!user){
            return res.status(404).json({success:false,error:"user not found"})
        }
        const isMatch = await bcrypt.compare(oldPassword,user.password);
        if(!isMatch){
            return res.status(400).json({success:false,error:"old passwrod is incorrect"})
        }
        const hashPassword = await bcrypt.hash(newPassword,10);
        const newUser = await User.findByIdAndUpdate({_id:userId},{password:hashPassword})
        return  res.status(200).json({success:true,message:"password changed successfully",user: newUser })
    }catch(error){
        console.error("Password Change Error:", error);
        return res.status(500).json({success:false,error:"An unexpected error occurred"});
    }

}
export {changePassword}