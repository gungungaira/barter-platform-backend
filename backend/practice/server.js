const express = require('express');
const cors= require('cors')
const app=express();
app.use(express.json());
app.use(cors());

const checkRequest =(req , res,next)=>{
   console.log('here is middleware implemented ')
   next();
}

app.get("/login",checkRequest,(req,res)=>{
    res.send("server is running ");

})
app.post('/login',(req,res)=>{
    console.log(req.body);

    res.json({
        success:true,
        message:"login successfully"
    })
})

app.get('/profile',(req , res)=>{
    console.log("Profile GET request received");
    res.json({
        success:true,
         message:'user get api is working perfectly',
        user:{
           email:'gungungaira@gmail.com' ,
           password:'111111',
        }
    })
})
app.listen(5000,()=>{
    console.log("server is running in 5000 port")
});
