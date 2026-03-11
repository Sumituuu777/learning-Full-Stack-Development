const http=require('http');

const requirefunction=(req,res)=>{

    if(req.url==='/'){
        res.setHeader('content-type','text/html');
        res.write(`<!DOCTYPE html>
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
    }
    else if(req.url==='/submit-details' && req.method=="POST"){
        const bufferArr=[];
        req.on('data',(chunk)=>{
            console.log(chunk);
            bufferArr.push(chunk);
        })
        req.on('end',()=>{
            const parsedbufferArr=Buffer.concat(bufferArr).toString();
            console.log(parsedbufferArr);
        })
    }
    else if(req.url==='/products'){
        res.setHeader('content-type','text/html');
        res.write('<html>')
        res.write('<h1>Products list...</h1>')
        res.write('</html>')
    }
    else{
        res.statusCode=404;
        res.setHeader('content-type','text/html');
        res.write('<html>')
        res.write('<h1>Error 404:Page not found</h1>')
        res.write('</html>')
    }
    res.end();
    
}
const server=http.createServer(requirefunction);
const PORT=3000;
server.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}/`);
    
});