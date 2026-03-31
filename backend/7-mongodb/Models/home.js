const { getdb } = require("../util/database-util")

module.exports= class Home{
    constructor(houseName,price,location,rating,photoURL,description){
        this.houseName=houseName,
        this.price=price,
        this.location=location,
        this.rating=rating,
        this.photoURL=photoURL,
        this.description=description
    }
    save(){
        const db=getdb();
        return db.collection("homes").insertOne(this).then((result)=>{
            console.log(result);
            
        })
    }
    static fetchAll(){
    }
    static findBYId(id){
    }
    static deleteById(id){
    }
}