const Favorites = require('../Models/favorites');
const Home=require('./../Models/home')
exports.homepage=(req,res,next)=>{
    Home.fetchAll().then(([rows,feilds])=>{
        res.render('store/index',{homes : rows,title:'Airbnb'})
}).catch(
    (err)=>{
        console.log("error while fetching homes",err);    
    }
)}

exports.availableHomes=(req,res,next)=>{
    Home.fetchAll().then(([rows,feilds])=>{
        res.render('store/AvailableHomes',{homes : rows,title:'availableHomes'})
}).catch(
    (err)=>{
        console.log("error while fetching homes",err);    
    }
)}
exports.getDetails=(req,res,next)=>{
    const homeId=req.params.homeId;
    Home.findBYId(homeId).then(([rows])=>{
        const home=rows[0];
        if(!home){
            console.log("home not found");
            return res.redirect('store/availablehomes');
        }
        res.render('store/home-details',{home:home,title:'Home details'})
    }).catch((err)=>{
        console.log("ERROR occured in find ny id",err);
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