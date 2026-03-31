const { ObjectId } = require("mongodb");
const { getdb } = require("../util/database-util")

module.exports= class Home{
    constructor(houseName,price,location,rating,photoURL,description,id){
        this.houseName=houseName,
        this.price=price,
        this.location=location,
        this.rating=rating,
        this.photoURL=photoURL,
        this.description=description
        if(id){
            this._id=new ObjectId(String(id));
        }
    }
    save(){
        if(this._id){
            const db=getdb();
            return db.collection("homes").updateOne({_id:this._id},{$set:this})
           
        }
        else{ 
            const db=getdb();
            return db.collection("homes").insertOne(this)
        }
    }
    static fetchAll(){
        const db=getdb();
        return db.collection("homes").find().toArray()
    }
    static findBYId(homeId){
        const db=getdb();
        return db.collection("homes").find({_id:new ObjectId(String(homeId))}).next()
        .then((home)=>{
            return home;
        })
        .catch((err)=>{
            console.log(err);
            
        })

    }
    static deleteById(homeId){
        const db=getdb();
        return db.collection("homes").deleteOne({_id:new ObjectId(String(homeId))})
    }
}