const { ObjectId } = require("mongodb");
const { getdb } = require("../util/database-util");

module.exports= class Favorites{
    constructor(homeId){
        this.homeId=homeId
    }
    addFavorites(){ 
        const db=getdb();
        return db.collection("favorites").insertOne(this)

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