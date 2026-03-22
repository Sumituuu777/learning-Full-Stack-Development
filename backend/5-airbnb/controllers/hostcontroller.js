const Home=require('./../Models/home')
exports.getAddhome=(req,res,next)=>{
    res.render('addhome',{title:'Add Home'});
};
exports.postAddhome=(req,res,next)=>{
    const houseName=req.body.houseName;
    const newHome=new Home(houseName);
    newHome.save();
    res.render('home-added',{title:'Home Added'});
};