const Home=require('./../Models/home')
exports.homepage=(req,res,next)=>{
    const registeredHomes=Home.fetchAll();
    res.render('index',{homes : registeredHomes,title:'Airbnb'})
}