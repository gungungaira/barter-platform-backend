const multer=require('multer');
const express=require('express');
const app=express();
const upload= multer({dest:'upload/'});

app.post('/upload', upload.single('file'),(req,res)=>{
    console.log(req.file);
    res.json({message:"file uploaded "})
   
})

app.listen(3000,()=>{
    console.log('server is running in 3000 port')
})
