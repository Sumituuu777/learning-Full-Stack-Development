const http=require('http');
const { requirefunction } = require('./Requirefunc');


const server=http.createServer(requirefunction);
const PORT=3000;
server.listen(PORT,()=>{
    console.log(`server running at http://localhost:${PORT}/`);
    
});