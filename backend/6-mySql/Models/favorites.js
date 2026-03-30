const fs=require('fs');
const path=require('path');
const rootdir=require('../util/path');

const favoritespath=path.join(rootdir,'data','favorites.json')

module.exports= class Favorites{
    static addFavorites(homeID){
    this.getFavorites((favorites)=>{
        if(favorites.includes(homeID)){
            console.log("home already in favorites")
        }else{
            favorites.push(homeID);
            fs.writeFile(favoritespath,JSON.stringify(favorites),err=>{
                if(err){
                    console.log('file writing',err);
                }
            })
        }
    })
    }
    static getFavorites(callback){
        fs.readFile(favoritespath, (err,data)=>{
            let homesdata=[];
            if(!err){
                homesdata=JSON.parse(data); 
            }
            callback(homesdata); 
        });
    }
}