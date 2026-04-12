//core modules
const express=require('express');
const { getlogin, postlogin, postlogout, getsignup, postsignup } = require('../controllers/authcontroller');
//local modules
const authRouter=express.Router();

authRouter.get("/login",getlogin)
authRouter.post("/login",postlogin)
authRouter.post("/logout",postlogout)
authRouter.get("/signup",getsignup)
authRouter.post("/signup",postsignup)

//named export
exports.authRouter=authRouter;