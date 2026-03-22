//core modules
const express=require('express');
//local modules
const { getAddhome, postAddhome } = require('../controllers/hostcontroller');

const hostRouter=express.Router();

hostRouter.get("/add-home",getAddhome)

hostRouter.post("/add-home",postAddhome)

//named export
exports.hostRouter=hostRouter;