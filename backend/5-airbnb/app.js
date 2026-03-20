//core modules
const http=require('http');
const path=require('path');
const express=require('express');
const bodyparser=require('body-parser');
//local modules
const hostRouter = require('./router/hostRouter');
const storeRouter = require('./router/storeRouter');
const rootdir = require('./util/path');

const app=express();
const server=http.createServer(app);
server.listen(3000,()=>{
    console.log('server running at http://localhost:3000/');
    
});
//body parser used
app.use(bodyparser.urlencoded({extended:true}));

app.use(express.static(path.join(rootdir,"public")))

//  local middleware starting
app.use(storeRouter)
app.use("/host",hostRouter)


app.use((req,res,next)=>{
    res.statusCode=404;
    res.send('<h1>Error 404:Page not found</h1>');
})