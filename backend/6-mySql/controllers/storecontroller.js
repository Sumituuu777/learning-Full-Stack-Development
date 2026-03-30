const Favorites = require('../Models/favorites');
const Home=require('./../Models/home')
exports.homepage=(req,res,next)=>{
    Home.fetchAll((homesdata)=>{
        res.render('store/index',{homes : homesdata,title:'Airbnb'})
    });
}
exports.availableHomes=(req,res,next)=>{
    Home.fetchAll((homesdata)=>{
        res.render('store/AvailableHomes',{homes : homesdata,title:'availableHomes'})
    });
}
exports.getDetails=(req,res,next)=>{
    const homeId=req.params.homeId;
    Home.findBYId(homeId,(home)=>{
        if(!home){
            return res.redirect('store/availablehomes')
        }
        res.render('store/home-details',{home:home,title:'Home details'})
    })
}
exports.getFavoritesList=(req,res,next)=>{
    Favorites.getFavorites((favorites)=>{
        Home.fetchAll((registeredHomes)=>{
            const actualfavorites=favorites.map(homeId=>registeredHomes.find(home=>home.id===homeId));
            res.render('store/favorites-list',{favorites:actualfavorites,title:'favorites'});
        })
    })
}
exports.postFavorites=(req,res,next)=>{
    const homeId=req.body.homeId;
    Favorites.addFavorites(homeId);
    res.redirect('/favorites');
}