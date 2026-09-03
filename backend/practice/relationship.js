// one -to-one with embedded 



// const express=require('express')
// const cors=require('cors');
// const mongoose=require('mongoose')
// const app=express();
// app.use(express.json());
// app.use(cors());

// mongoose
// .connect('mongodb://127.0.0.1:27017/crudDB')
// .then (()=>console.log('mongodb connected successfully '))
// .catch((error)=> console.log('there is problem in connection in mongoDB',error))


// const createSchema=new mongoose.Schema({
//   name:String,
//   email:String,
//   homeDetails:{
//     village:String,
//     city:String,
//     state:String
//   }
// })

// const User=mongoose.model('User',createSchema)

// app.post('/users',async(req,res)=>{
//     try{
//         const createData=await User.create(req.body)
//         res.json(createData)
//     }
//     catch(error){
//         res.json({message:"error found"})
        
//     }
// })
// app.get('/users',async(req,res)=>{
//     try{
//         const users=await User.find()
//         res.json(users)
//     }
//     catch(error){
//         res.json({message:"error found"})
        
//     }
// })

// app.listen(5000,()=>{
//     console.log('server is running in 5000 port')
// })




// one to one with reference 


const express=require('express')
const cors=require('cors');
const mongoose=require('mongoose');
const app=express();
app.use(express.json());
app.use(cors());

mongoose
.connect('mongodb://127.0.0.1:27017/crudDB')
.then (()=>console.log('mongodb connected successfully '))
.catch((error)=> console.log('there is problem in connection in mongoDB',error))

//  user Schema 

const userSchema = new mongoose.Schema({
    name:String,
    email:String
})
const User =mongoose.model('User',userSchema)


const userProfile = new mongoose.Schema({
    state:String,
    age:Number,
    userId:{
     type:mongoose.Schema.Types.ObjectId,
    ref:"User"
    }
})
const Profile =mongoose.model('Profile',userProfile)


app.post('/users',async(req,res)=>{
    try{
    const {name,email}=req.body;
    const checkUser= await User.findOne({email})
    if (checkUser){
        return res.status(200).json({message:"user already exist"})

    }
    const createUser=await User.create({
        name,
        email
    })
    res.status(200).json(createUser)
}
catch(error){
res.status(400).json({message:error.message})
}
})

// create profile

app.post('/profile',async(req,res)=>{
    try{
    const {state,age, userId}=req.body;
    const checkProfile= await Profile.findOne({userId})
    if (checkProfile){
        return res.status(404).json({message:"profile already exist"})

    }
    const createProfile=await Profile.create({
        state,
        age, 
        userId
    })
    res.status(200).json(createProfile)
}
catch(error){
res.status(400).json({message:error.message})
}

})

// get user 

app.get('/users',async(req,res)=>{
    try{
    const findUser= await User.find()
    res.status(200).json(findUser)
}
catch(error){
res.status(400).json({message:error.message})
}

})

// get profile

app.get('/users/:id/profile',async(req,res)=>{
    try{
    const findProfile= await Profile.findOne({userId:req.params.id}).populate('userId');
    if(!findProfile){
        return res.status(400).json({message:"user not found "})
    }
    res.status(200).json(findProfile)
}
catch(error){
res.status(400).json({message:error.message})
}

})

app.listen(5000,()=>{
  console.log('server is running in 5000 port ')
})




//  (one -to-many  with embedded ) 
// also many to many 



// const express=require('express')
// const cors=require('cors');
// const mongoose=require('mongoose')
// const app=express();
// app.use(express.json());
// app.use(cors());

// mongoose
// .connect('mongodb://127.0.0.1:27017/crudDB')
// .then (()=>console.log('mongodb connected successfully '))
// .catch((error)=> console.log('there is problem in connection in mongoDB',error))


// const createSchema=new mongoose.Schema({
//   name:String,
//   email:String,
//   homeDetails:[{
//     village:String,
//     city:String,
//     state:String
//   },
//   {
//     village:String,
//     city:String,
//     state:String
//   },
//    {
//     village:String,
//     city:String,
//     state:String
//   }
//   ]
// })

// const User=mongoose.model('User',createSchema)

// app.post('/users',async(req,res)=>{
//     try{
//         const createData=await User.create(req.body)
//         res.json(createData)
//     }
//     catch(error){
//         res.json({message:"error found"})
        
//     }
// })
// app.get('/users',async(req,res)=>{
//     try{
//         const users=await User.find()
//         res.json(users)
//     }
//     catch(error){
//         res.json({message:"error found"})
        
//     }
// })

// app.listen(5000,()=>{
//     console.log('server is running in 5000 port')
// })




