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
        //updating home
        Home.fetchAll((registeredHomes)=>{
            // console.log(registeredHomes,this);
            
            if(this.id){
                registeredHomes=registeredHomes.map((home)=>{
                    if(home.id===this.id){
                        return this;
                    }
                    return home;
                });
            }
            // for adding home
            else{
                // console.log("NEW HOME");
                this.id=Math.random().toString()
                registeredHomes.push(this);
            }

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
    static deleteById(id,callback){
        this.fetchAll((homes)=>{
            const updatedHomes=homes.filter((home)=>home.id!==id);
            fs.writeFile(filepath,JSON.stringify(updatedHomes),callback)
        })
    }
}