const mongodb=require('mongodb')
require('dotenv').config();
const MongoClient=mongodb.MongoClient;

const url=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@airbnb.c30s2fi.mongodb.net/?appName=airbnb`

let _db;
const mongoConnect=(callback)=>{
    MongoClient.connect(url)
    .then((client)=>{
        console.log("coneected to mongodb");
        _db = client.db(process.env.DB_NAME);;
        callback(client);    
    })
    .catch((err)=>{
        console.log("error while connecting to mongodb",err);
        throw err;
    })
}
const getdb=()=>{
    if(!_db){
        throw new Error("DATABASE NOT CONNNECTED")
    }
    return _db;
}
exports.mongoConnect=mongoConnect;
exports.getdb=getdb;