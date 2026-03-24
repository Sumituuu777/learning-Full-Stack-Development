const fs=require('fs');
const path=require('path');
const rootdir=require('../util/path');

const filepath=path.join(rootdir,'data','homes.json')

module.exports= class Home{
    constructor(houseName,price,location,rating,photoURL){
        this.houseName=houseName,
        this.price=price,
        this.location=location,
        this.rating=rating,
        this.photoURL=photoURL
    }
    save(callback){
        this.id=Math.random().toString()
        Home.fetchAll((registeredHomes)=>{
            registeredHomes.push(this);
            fs.writeFile(filepath,JSON.stringify(registeredHomes),callback)
        });
    }
    static fetchAll(callback){
        fs.readFile(filepath, (err,data)=>{
            let homesdata=[];
            if(!err){
                homesdata=JSON.parse(data); 
            }
            callback(homesdata); 
        });
    }
    static findBYId(id,callback){
        this.fetchAll((homes)=>{
            const home=homes.find((home)=>home.id===id)
            callback(home);
        })
    }
}