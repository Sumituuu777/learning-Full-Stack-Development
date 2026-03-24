//core modules
const express=require('express');
//local modules
const { homepage, getDetails, availableHomes, postFavorites, getFavoritesList } = require('../controllers/storecontroller');

const storeRouter=express.Router();

storeRouter.get('/',homepage)
storeRouter.get('/availablehomes',availableHomes)
storeRouter.get('/favorites',getFavoritesList)
storeRouter.post('/favorites',postFavorites)
storeRouter.get('/home/:homeId',getDetails)
exports.storeRouter=storeRouter;