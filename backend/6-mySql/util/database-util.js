const mysql=require('mysql2')
require('dotenv').config();
const pool=mysql.createPool({
    host:"localhost",
    user:"root",
    password: process.env.DB_PASS,
    database:"airbnb"
});
module.exports=pool.promise();