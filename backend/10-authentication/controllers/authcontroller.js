const {check, validationResult}=require('express-validator')
exports.getlogin=(req,res,next)=>{
    res.render('auth/login',{title:'login',isLoggedIn: req.session.isLoggedIn})
}
exports.getsignup=(req,res,next)=>{
    res.render('auth/signup',{title:'signup',isLoggedIn: req.session.isLoggedIn})
}
exports.postlogin=(req,res,next)=>{
    req.session.isLoggedIn=true;
    res.redirect('/')
}
exports.postsignup=[
    // for firstname
    check('firstname')
    .notEmpty()
    .withMessage('first name cannot be Empty')
    .trim()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('first name can only contain alphabets'),

    // for lastname
    check('lastname')
    .notEmpty()
    .withMessage('last name cannot be Empty')
    .trim()
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage('last name can only contain alphabets'),

    // for Email
    check('email')
    .isEmail()
    .withMessage('Enter a valid Email')
    .normalizeEmail(),

    // password
    check('password')
    .isLength({min:8})
    .withMessage("password must be of atleast 8 characters")
    .matches(/[a-z]/)
    .withMessage('password must contain atleast one lowercase alphabet')
    .matches(/[A-Z]/)
    .withMessage('password must contain atleast one uppercase alphabet')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("password must contain atleast one special character")
    .trim(),

    check('confirm_password')
    .trim()
    .custom((value,{req})=>{
        if(value!=req.body.password){
            throw new Error('Password do not match')
        }
        return true;
    }),

    (req,res,next)=>{
        const {firstname,lastname,email,password}=req.body;
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            res.status(422).render('auth/signup',{
                title:'signup',
                isLoggedIn: false,
                errorMessages:errors.array().map(error=>error.msg),
                oldInput:{
                    firstname,
                    lastname,
                    email,
                    password
                }
            })
        }else{
        res.redirect('/login')
        }
    }
]
exports.postlogout=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
    
}