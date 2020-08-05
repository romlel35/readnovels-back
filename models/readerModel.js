

module.exports = (_db)=>{
    db = _db;
    return readerModel;
}

const bcrypt = require("bcryptjs");
let salt = bcrypt.genSaltSync(10);


class readerModel{
 
    

    static registerReader(req){
        console.log("***Début du Model Register reader***");
       // console.log(db);
        console.log("req.body : ",req.body)
        let hash = bcrypt.hashSync(req.body.password, salt);
            
        return    db.query("INSERT INTO reader  (firstName, lastName, email, password, pseudo, creationTimestamp)  VALUES (?,?,?,?,?, NOW())", [req.body.firstName, req.body.lastName, req.body.email, hash, req.body.pseudo]).then((response) =>{
            console.log(response);
            return response;
        })
        .catch((error)=>{
            console.log("error : ", error);
            return error;
        })
    }
    static getReaderByEmail(req){
        console.log("***Début Model GetreaderByEmail*****");
        //console.log("req.body : ",req.body);
        return db.query("SELECT * from reader WHERE email=?",[req.body.email])
        .then((response) =>{
           // console.log(response);
            return response;
        })
        .catch((error)=>{
            console.log("error : ", error);
            return error;
        })
    }
    static getReaderById(id){
        console.log("***Début Model GetreaderById*****");
       //console.log("id : ",id)
        return db.query("SELECT * from reader WHERE id=?",[id])
        .then((response) =>{
            //console.log(response);
            return response;
        })
        .catch((error)=>{
            console.log("error : ", error);
            return error;
        })
    }
    static updateReader(req){
        console.log("***Début du Model updatereader***");
       // console.log(db);
       // console.log("req.body : ",req.body)
       
            
        return    db.query("UPDATE reader  SET (firstName, lastName, email, pseudo, creationTimestamp)  VALUES (?,?,?,?,?, NOW(), ?)", [req.body.firstName, req.body.lastName, req.body.email, req.body.pseudo]).then((response) =>{
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
		return db.query('UPDATE reader SET imgUrl = ? WHERE id = ?', [req.body.imageUrl, req.body.id])
				.then((result)=>{
					console.log('resultatttt',result);
					return result;
				})
				.catch((err)=>{
					return err;
				})
	}






}