const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User=require('../models/User')

const register= async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "email is not find ",
      });
    }
    const protectPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: protectPassword,
    });
    res.status(200).json({
      userId: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(401).json({message:error.message})
  }
};
const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
     const checkEmail=await User.findOne({email})
     if(!checkEmail){
        return res.status(401).json({
            message:'invalid email please verify your email'
        })
     }

    const comparePassword= await bcrypt.compare(password, checkEmail.password)
    if(!comparePassword){
        return res.status(501).json({message:'email and password both are not valid check again'})
    }
    const token =await jwt.sign({
        userId:checkEmail._id,
        email:checkEmail.email
    },
       process.env.JWT_SECRET,
    {
        expiresIn:'1h'
    }
)
   res.status(200).json({token:token,message:'login successfully'})

    }
    catch (error) {
    res.status(401).json({message:error.message})
  }
}

module.exports={register,login};