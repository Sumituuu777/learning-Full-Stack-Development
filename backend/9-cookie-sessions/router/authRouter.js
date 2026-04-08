//core modules
const express=require('express');
const { getlogin, postlogin, postlogout } = require('../controllers/authcontroller');
//local modules
const authRouter=express.Router();

authRouter.get("/login",getlogin)
authRouter.post("/login",postlogin)
authRouter.post("/logout",postlogout)

//named export
exports.authRouter=authRouter;