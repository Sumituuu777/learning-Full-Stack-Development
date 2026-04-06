exports.getlogin=(req,res,next)=>{
    res.render('auth/login',{title:'login',isLoggedIn: req.isLoggedIn})
}
exports.postlogin=(req,res,next)=>{
    console.log(req.body);
    res.cookie("isLoggedIn",true)
    res.redirect('/')
}