const { ObjectId } = require("mongodb");
const { getdb } = require("../util/database-util");

module.exports= class Favorites{
    constructor(homeId){
        this.homeId=homeId
    }
    addFavorites(){ 
        const db=getdb();
        return db.collection("favorites").findOne({homeId:this.homeId})
        .then(existingfavs=>{
            if(!existingfavs){
                return db.collection("favorites").insertOne(this)
            }
            return Promise.resolve();
        })
       
    }
    static getFavorites(){
        const db=getdb();
        return db.collection("favorites").find().toArray()    
    }
    static deleteById(homeId){
            const db=getdb();
            return db.collection("favorites").deleteOne({homeId})
        }
}