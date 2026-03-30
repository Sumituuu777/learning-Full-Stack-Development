const airbnbdb=require('../util/database-util')

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
            if(this.id){
                        return airbnbdb.execute(
                            "UPDATE new_table SET houseName=?, price=?, location=?, rating=?, photoURL=?, description=? WHERE id=?",
                            [this.houseName,
                            this.price,
                            this.location,
                            this.rating,
                            this.photoURL,
                            this.description,
                            this.id
                            ]
                        )
            }
            else{
                return airbnbdb.execute(
                    "INSERT INTO new_table (houseName,price,location,rating,photoURL,description) VALUES (?,?,?,?,?,?)",
                    [this.houseName,
                    this.price,
                    this.location,
                    this.rating,
                    this.photoURL,
                    this.description]
       )
            }
    }
    static fetchAll(){
        return airbnbdb.execute("SELECT * FROM new_table")
    }
    static findBYId(id){
        return airbnbdb.execute("SELECT * FROM new_table WHERE id=?",[id])
    }
    static deleteById(id){
        return airbnbdb.execute("DELETE FROM new_table WHERE id=?",[id])
    }
}