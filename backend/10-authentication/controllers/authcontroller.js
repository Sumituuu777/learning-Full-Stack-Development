const {check, validationResult}=require('express-validator')
const User = require('../Models/user')
const bcrypt=require('bcryptjs');

exports.getlogin=(req,res,next)=>{
    res.render('auth/login',{title:'login',isLoggedIn: false})
}
exports.getsignup=(req,res,next)=>{
    res.render('auth/signup',{title:'signup',isLoggedIn: false})
}
exports.postlogin= async (req,res,next)=>{
    const {email,password}=req.body;
    
    try{
        const user=await User.findOne({email:email});
        if(!user){
            return res.render('auth/login',
                {title:'login',
                isLoggedIn: false,
                errorMessages: 'Invalid Email'
            })
        }
        const isMatch= await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.render('auth/login', 
                {title:'login',
                isLoggedIn: false,
                errorMessages: 'Invalid Password'
            })
        }
        req.session.isLoggedIn=true;
        req.session.user = {
            _id: user._id.toString(),
            email: user.email,
            firstname: user.firstname,
            userType: user.userType
        };
        req.session.save(err => {
            if (err) console.log(err);
        });
        if(user.userType==='guest'){  res.redirect('/availablehomes');}
        else{ res.redirect('/host/host-homes')}
    }
    catch(err){
        console.log('err while logging in',err); 
    }
    
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
        const {firstname,lastname,email,password,userType}=req.body;
        const errors=validationResult(req)

        if(!errors.isEmpty()){
            return res.status(422).render('auth/signup',{
                title:'signup',
                isLoggedIn: false,
                errorMessages:errors.array().map(error=>error.msg),
                oldInput:req.body
            })
        }
        bcrypt.hash(password,12).then(hashedpassword=>{
        const user=new User({
                    firstname,
                    lastname,
                    email,
                    password: hashedpassword,
                    userType
        })
        
        user.save().then((result)=>{
            res.redirect('/login');
        })
        .catch((err)=>{
            res.status(422).render('auth/signup',{
                title:'signup',
                isLoggedIn: false,
                errorMessages:[err],
                oldInput:{
                    firstname,
                    lastname,
                    email,
                    password,
                    userType
                }
            })
        })
        });
   
    }
]
exports.postlogout=(req,res,next)=>{
    req.session.destroy(()=>{
        res.redirect('/login')
    })
    
};