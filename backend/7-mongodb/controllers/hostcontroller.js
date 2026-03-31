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
    const{houseName,price,location,rating,photoURL,description}=req.body;
    const newHome=new Home(houseName,price,location,rating,photoURL,description);
    newHome.save().then(()=>{
        res.redirect('/availablehomes')
    }).catch((err)=>{
        console.log("ERROR in Post add home",err);  
    });   
};
exports.getEdithome=(req,res,next)=>{
    const editing=req.query.editing==="true";
    const homeId=req.params.homeId;
    Home.findBYId(homeId).then((home)=>{
        if(!home){
           return res.redirect("/availablehomes")
        }
        res.render('host/edithome',{
        title:"Edit Home",
        editing:editing,
        homeId:homeId,
        home:home
        })
        }).catch((err)=>{
        console.log("ERROR in Post add home",err);  
    })
};
exports.postEdithome=(req,res,next)=>{
    const {id,houseName,price,location,rating,photoURL,description}=req.body;
    const home =new Home(houseName,price,location,rating,photoURL,description,id);
    home.save().then(()=>{
        res.redirect('/availablehomes');
    }).catch((err)=>{
        console.log("ERROR in Post add home",err);  
    });
}
exports.getDeletehome=(req,res,next)=>{
    const homeId=req.params.homeId;
    Home.deleteById(homeId).then(()=>{
        return res.redirect("/availablehomes")
    }).catch((err)=>{
        console.log("Error occured while deleting",err);     
    })
};