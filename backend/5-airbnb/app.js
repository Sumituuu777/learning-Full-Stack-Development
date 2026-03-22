//core modules
const http=require('http');
const path=require('path');
const express=require('express');
const bodyparser=require('body-parser');
//local modules
const {hostRouter} = require('./router/hostRouter');
const {storeRouter} = require('./router/storeRouter');
const rootdir = require('./util/path');

const app=express();
app.set('view engine','ejs');
app.set('views','views');

const server=http.createServer(app);
server.listen(3000,()=>{
    console.log('server running at http://localhost:3000/');
    
});
//body parser used// lekin isko express.urlencoded({extended:true}) se  replace karna hai
app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static(path.join(rootdir,"public")))

//  local middleware starting
app.use(storeRouter)
app.use("/host",hostRouter)


app.use((req,res,next)=>{
    res.statusCode=404;
    res.render('404',{title:'page not found'});
})