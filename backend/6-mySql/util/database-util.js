const mysql=require('mysql2')

const pool=mysql.createPool({
    host:"localhost",
    user:"root",
    password: process.env.DB_PASS,
    database:"airbnb"
});
module.exports=pool.promise();