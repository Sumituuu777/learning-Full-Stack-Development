//core modules
const express=require('express');
//local modules
const { registeredHomes } = require('./hostRouter');

const storeRouter=express.Router();

storeRouter.get('/',(req,res,next)=>{
  
    res.render('index',{homes : registeredHomes,title:'Airbnb'})
})
exports.storeRouter=storeRouter;