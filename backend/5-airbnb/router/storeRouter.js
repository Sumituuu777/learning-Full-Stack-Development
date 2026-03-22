//core modules
const express=require('express');
//local modules
const { homepage } = require('../controllers/storecontroller');

const storeRouter=express.Router();

storeRouter.get('/',homepage)
exports.storeRouter=storeRouter;