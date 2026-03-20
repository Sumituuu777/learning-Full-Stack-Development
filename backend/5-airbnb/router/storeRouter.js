//core modules
const express=require('express');
const path=require('path');
//local modules
const rootdir=require('../util/path')

const storeRouter=express.Router();

storeRouter.get('/',(req,res,next)=>{
    res.sendFile(path.join(rootdir,"veiws","index.html"))
})
module.exports=storeRouter;