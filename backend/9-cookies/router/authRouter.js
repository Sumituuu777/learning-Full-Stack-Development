//core modules
const express=require('express');
const { getlogin, postlogin } = require('../controllers/authcontroller');
//local modules
const authRouter=express.Router();

authRouter.get("/login",getlogin)
authRouter.post("/login",postlogin)

//named export
exports.authRouter=authRouter;