const http=require('http');
const express=require('express')
const fs=require('fs');
const { URLSearchParams } = require('url');
const { log } = require('console');

const app=express();
const server=http.createServer(app);
const PORT=3000;
server.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}/`);
    
});
app.get('/',(req,res,next)=>{
    res.send(`<!DOCTYPE html>
                <html lang="en">
                <head>
                    <title>Home</title>
                </head>
                <body>
                    <form action="/submit-details" method="POST">
                        <input type="text" placeholder="Enter your name" name="name" id="name">
                        <input type="text" placeholder="Enter your age" name="age" id="age">
                        <button type="submit">Submit</button>
                        
                    </form>
                </body>
                </html>`)
});
app.post('/submit-details',(req,res,next)=>{
    const bufferArr=[];
            req.on('data',(chunk)=>{
                console.log(chunk);
                bufferArr.push(chunk);
            })
            req.on('end',()=>{
                const parsedbufferArr=Buffer.concat(bufferArr).toString();
                console.log(parsedbufferArr);
    
                const parsedpairs=new URLSearchParams(parsedbufferArr);
    
                const jsonObj={};
                for (const [key,value] of parsedpairs.entries()){
                    jsonObj[key]=value;
                }
                console.log(JSON.stringify(jsonObj))
                fs.writeFile('user-details.json',JSON.stringify(jsonObj),(err)=>{
                    if(err){
                        console.log(err);  
                    }else{
                        console.log('Data received successfully');
                        res.send('<h1>Data received successfully</h1>');
                    }
                });
                
            });
});
app.get('/products',(req,res,next)=>{
    res.send('<h1>Products list...</h1>');
});
app.use((req,res,next)=>{
    res.send('<h1>Error 404:Page not found</h1>');
})