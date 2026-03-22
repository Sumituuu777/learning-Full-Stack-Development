const Home=require('./../Models/home')
exports.homepage=(req,res,next)=>{
    Home.fetchAll((homesdata)=>{
        res.render('index',{homes : homesdata,title:'Airbnb'})
    });
}