const Home=require('./../Models/home')
exports.getAddhome=(req,res,next)=>{
    const editing=req.query.editing==="true";
    res.render('host/edithome',{
        title:'Add Home',
        editing:editing,
        home:''
    });
};
exports.postAddhome=(req,res,next)=>{
    const{houseName,price,location,rating,photoURL}=req.body;
    const newHome=new Home(houseName,price,location,rating,photoURL);
    newHome.save(err=>{
        if(err){
            res.redirect('/')
        }else{
        res.render('host/home-added',{title:"home Added"});
        }
    });
};
exports.getEdithome=(req,res,next)=>{
    const editing=req.query.editing==="true";
    const homeId=req.params.homeId;
    Home.findBYId(homeId,(home)=>{
        if(!home){
           return res.redirect("/availablehomes")
        }
        res.render('host/edithome',{
        title:"Edit Home",
        editing:editing,
        homeId:homeId,
        home:home
    });
    });  
}
exports.postEdithome=(req,res,next)=>{
    const {id,houseName,price,location,rating,photoURL}=req.body;
    const home =new Home(houseName,price,location,rating,photoURL);
    home.id=id;
    home.save(err=>{
        if(err){
            console.log("Error occured while updating",err)
        }else{
            res.redirect("/availablehomes")
        }
    });
}