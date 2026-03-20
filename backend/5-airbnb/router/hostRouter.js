//core modules
const express=require('express');
const path=require('path');
//local modules
const rootdir=require('../util/path')
const hostRouter=express.Router();

hostRouter.get("/add-home",(req,res,next)=>{
    res.sendFile(path.join(rootdir,"veiws","addhome.html"))
})
hostRouter.post("/add-home",(req,res,next)=>{
    console.log("form submitteed");
    
    res.sendFile(path.join(rootdir,"veiws","home-added.html"))
})
module.exports=hostRouter;