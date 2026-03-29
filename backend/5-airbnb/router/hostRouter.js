//core modules
const express=require('express');
//local modules
const { getAddhome, postAddhome, getEdithome, postEdithome } = require('../controllers/hostcontroller');

const hostRouter=express.Router();

hostRouter.get("/add-home",getAddhome)

hostRouter.post("/add-home",postAddhome)
hostRouter.get("/edit-home/:homeId",getEdithome)
hostRouter.post("/edit-home",postEdithome)

//named export
exports.hostRouter=hostRouter;