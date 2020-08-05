
module.exports = (_db)=>{
    db = _db;
    return chapitreModel;
}

const bcrypt = require("bcryptjs");
let salt = bcrypt.genSaltSync(10);


class chapitreModel{
 
    

    static registerChapitre(req){
        console.log("***Début du Model RegisterChapitre***");
       // console.log(db);
        console.log("req.body : ",req.body)
      
            
        return    db.query("INSERT INTO chapters  (title, roman_id, content,creationTimestamp)  VALUES (?,?,?, NOW())", [req.body.title, req.body.roman_id, req.body.content]).then((response) =>{
            console.log(response);
            return response;
        })
        .catch((error)=>{
            console.log("error : ", error);
            return error;
        })
    }
    static updateChapitre(req){
        console.log("***Début du Model updateChapitre***");
       // console.log(db);
        console.log("req.body : ",req.body)
       
        return    db.query("UPDATE chapters SET content =?  ", [req.body.content]).then((response) =>{
            console.log(response);
            return response;
        })
        .catch((error)=>{
            console.log("error : ", error);
            return error;
        })
    }
    
    static getChapitreById(id){
        console.log("***Début Model GetChapitreById*****");
       console.log("id : ",id)
        return db.query("SELECT * from chapters WHERE id=?",[id])
        .then((response) =>{
            console.log(response);
            return response;
        })
        .catch((error)=>{
            console.log("error : ", error);
            return error;
        })
    }

    static getAllChapitres(id){
       
        return db.query("SELECT * from chapters WHERE roman_id=?", [id])
        .then((response) =>{
            console.log(response);
            return response;
        })
        .catch((error)=>{
            console.log("error : ", error);
            return error;
        })
    }
  
 





}