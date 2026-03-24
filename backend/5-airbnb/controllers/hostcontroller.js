const Home=require('./../Models/home')
exports.getAddhome=(req,res,next)=>{
    res.render('addhome',{title:'Add Home'});
};
exports.postAddhome=(req,res,next)=>{
    const{houseName,price,location,rating,photoURL}=req.body;
    const newHome=new Home(houseName,price,location,rating,photoURL);
    newHome.save(err=>{
        if(err){
            res.redirect('/')
        }else{
        res.render('/home-added',{title:"home Added"});
        }
    });
};