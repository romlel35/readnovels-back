

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
            
        return    db.query("INSERT INTO author  (firstName, lastName, email, password, address, zip, city, creationTimestamp, penName)  VALUES (?,?,?,?,?,?,?, NOW(), ?)", [req.body.firstName, req.body.lastName, req.body.email, hash, req.body.address, req.body.zip, req.body.city, req.body.penName]).then((response) =>{
            console.log(response);
            return response;
        })
        .catch((error)=>{
            console.log("error : ", error);
            return error;
        })
    }
    static getAuthorByEmail(req){
        console.log("***Début Model GetAuthorByEmail*****");
        //console.log("req.body : ",req.body);
        return db.query("SELECT * from author WHERE email=?",[req.body.email])
        .then((response) =>{
           // console.log(response);
            return response;
        })
        .catch((error)=>{
            console.log("error : ", error);
            return error;
        })
    }
    static getAuthorById(id){
        console.log("***Début Model GetAuthorById*****");
       //console.log("id : ",id)
        return db.query("SELECT * from author WHERE id=?",[id])
        .then((response) =>{
            //console.log(response);
            return response;
        })
        .catch((error)=>{
            console.log("error : ", error);
            return error;
        })
    }
    static updateAuthor(req){
        console.log("***Début du Model updateAuthor***");
       // console.log(db);
       // console.log("req.body : ",req.body)
       
            
        return    db.query("UPDATE author  SET (firstName, lastName, email, address, zip, city, creationTimestamp, penName)  VALUES (?,?,?,,?,?,?, NOW(), ?)", [req.body.firstName, req.body.lastName, req.body.email, req.body.address, req.body.zip, req.body.city, req.body.penName]).then((response) =>{
            console.log(response);
            return response;
        })
        .catch((error)=>{
            console.log("error : ", error);
            return error;
        })
    }
    static updateImg(req) {
        console.log('**** Debut Model SetImage *****')
        console.log("req.body : ",req.body);
		return db.query('UPDATE author SET imgUrl = ? WHERE id = ?', [req.body.imageUrl, req.body.id])
				.then((result)=>{
					console.log('resultatttt',result);
					return result;
				})
				.catch((err)=>{
					return err;
				})
	}






}