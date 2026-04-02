const Favorites = require('../Models/favorites');
const Home=require('./../Models/home')
exports.homepage=(req,res,next)=>{
    Home.find().then((registeredHomes)=>{
        res.render('store/index',{homes : registeredHomes,title:'Airbnb'})
}).catch(
    (err)=>{
        console.log("error while fetching homes",err);    
    }
)}

exports.availableHomes=(req,res,next)=>{
    Home.find().then((registeredHomes)=>{
        res.render('store/AvailableHomes',{homes : registeredHomes,title:'availableHomes'})
}).catch(
    (err)=>{
        console.log("error while fetching homes",err);    
    }
)}


exports.getDetails=(req,res,next)=>{
    const homeId=req.params.homeId;
    Home.findById(homeId).then((home)=>{
        if(!home){
            console.log("home not found");
            return res.redirect('store/availablehomes');
        }
        res.render('store/home-details',{home:home,title:'Home details'})
    }).catch((err)=>{
        console.log("ERROR occured in find my id",err);
    })
}


exports.getFavoritesList=(req,res,next)=>{
    Favorites.find().then(favoriteIds=>{

        favoriteIds=favoriteIds.map(favId=>favId.homeId.toString()); 
        Home.find().then(registeredHomes=>{
            const actualfavorites=registeredHomes.filter(home=>favoriteIds.includes(home._id.toString()))
            res.render('store/favorites-list',{favorites:actualfavorites,title:'favorites'});            
        })
    })
}


exports.postFavorites=(req,res,next)=>{
    const homeId=req.body.homeId;
    Favorites.findOne({homeId:homeId})
    .then(existingfavs=>{
        if(existingfavs){
            res.redirect("/favorites")
        }
    })
    const favobj= new Favorites({homeId:homeId});
    return favobj.save()
    .then(()=>{
        res.redirect("/favorites")
    })
    .catch((err)=>{
        console.log("Error in add to favorites",err);
    }) 
}
exports.postremoveFavorite=(req,res,next)=>{
    const homeId=req.params.homeId;
    Favorites.findOneAndDelete(homeId).then(()=>{
        res.redirect('/favorites')
    })
    .catch((err)=>{
        console.log("Error in remove from favorites",err);
    }) 
}