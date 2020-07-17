

module.exports = (_db)=>{
    db = _db;
    return authorModel;
}

const bcrypt = require("bcryptjs");
let salt = bcrypt.genSaltSync(10);


class authorModel{
 
    

    static registerAuthor(req){
        console.log("***Début du Model RegisterAuthor***");
       // console.log(db);
        console.log("req.body : ",req.body)
        let hash = bcrypt.hashSync(req.body.password, salt);
            
        return    db.query("INSERT INTO author  (firstName, lastName, email, password, address, zip, city, creationTimestamp)  VALUES (?,?,?,?,?,?,?, NOW())", [req.body.firstName, req.body.lastName, req.body.email, hash, req.body.address, req.body.zip, req.body.city]).then((response) =>{
            console.log(response);
            return response;
        })
        .catch((error)=>{
            console.log("error : ", error);
            return error;
        })
    }






}