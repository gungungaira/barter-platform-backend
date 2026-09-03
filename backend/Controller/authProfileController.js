const User=require('../models/User')

const getProfile=async (req, res) =>{
    try{
     const getProfile=await User.findById(req.user.userId).select('-password')
     if(!getProfile){
        return res.status(400).json({message:"invalid email"});
     }
     res.status(200).json({getProfile,message:"get successfully"})
    }
    catch(error){
   res.status(400).json({message:error.message})
    }
}
const updateProfile=async (req, res) =>{
    try{
        const {name,email}=req.body;
     const updateProfile=await User.findByIdAndUpdate(req.user.userId,{name,email},{new:true}).select('-password')
     if(!updateProfile){
        return res.status(400).json({message:"invalid email"});
     }
     res.status(200).json({updateProfile,message:"update successfully"})
    }
    catch(error){
   res.status(400).json({message:error.message})
    }
}
const deleteProfile=async (req, res) =>{
    try{
     const deleteProfile=await User.findByIdAndDelete(req.user.userId).select('-password')
     if(!deleteProfile){
        return res.status(400).json({message:"invalid email"});
     }
     res.status(200).json({deleteProfile,message:"delete successfully"})
    }
    catch(error){
   res.status(400).json({message:error.message})
    }
}

module.exports={getProfile,updateProfile,deleteProfile}