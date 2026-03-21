//core modules
const express=require('express');
//local modules
const hostRouter=express.Router();

hostRouter.get("/add-home",(req,res,next)=>{
    res.render('addhome',{title:'Add Home'});
})

const registeredHomes=[];
hostRouter.post("/add-home",(req,res,next)=>{
    registeredHomes.push(req.body)
    
    res.render('home-added',{title:'Home Added'});
})

//named export
exports.hostRouter=hostRouter;
exports.registeredHomes=registeredHomes;