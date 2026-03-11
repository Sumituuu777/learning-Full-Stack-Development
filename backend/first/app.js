const http=require('http');
console.log("i am here");
const requirefunction=(req,res)=>{
    console.log("i am here by server");
    res.setHeader('content-type','text/html');
    res.write('<html>')
    res.write('<h1>I am response by server</h1>')
    res.write('</html>')
    res.end();
    process.exit();
    
}
const server=http.createServer(requirefunction);
const PORT=3000;
server.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}/`);
    
});