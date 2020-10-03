

module.exports = (_db)=>{
    db = _db;
    return authorModel;
}

const bcrypt = require("bcryptjs");
let salt = bcrypt.genSaltSync(10);

function dateDiff(date1, date2){
    var diff = {}                           // Initialisation du retour
    var tmp = date2 - date1;
 
    tmp = Math.floor(tmp/1000);             // Nombre de secondes entre les 2 dates
    diff.sec = tmp % 60;                    // Extraction du nombre de secondes
 
    tmp = Math.floor((tmp-diff.sec)/60);    // Nombre de minutes (partie entière)
    diff.min = tmp % 60;                    // Extraction du nombre de minutes
 
    tmp = Math.floor((tmp-diff.min)/60);    // Nombre d'heures (entières)
    diff.hour = tmp % 24;                   // Extraction du nombre d'heures
     
    tmp = Math.floor((tmp-diff.hour)/24);   // Nombre de jours restants
    diff.day = tmp;
     
    return diff;
}

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
    static getAuthorByPasswordToken(token){
        console.log("***Début Model GetAuthorByPasswordToken*****");
       let date  = new Date();
      console.log("token : ",token)
        return db.query("SELECT * from author WHERE resetPasswordToken=?",[token])
        .then((response) =>{
            console.log("response : ",response)

            if (response.length === 0){

                return;
            }
            else{
                let diff= dateDiff(response[0].resetPasswordExpires, date)
                if(diff.hour < 1){
                   
                    console.log("**** diif.hour : ",diff.hour);
                    console.log("**** diif.day : ",diff.day)
                    console.log("****date : ",date)
                    return response;
                }
                else{
                    
                    console.log("**** diif.hour : ",diff.hour);
                    console.log("**** diif.day : ",diff.day)
                    console.log("****date : ",date)
                    return ;
                }
            }
           
           
            
        })
        .catch((error)=>{
            console.log("error : ", error);
            return ;// a voir si j'ai besoin de remettre l'erreur
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


    static updateResetToken(email,token){
        console.log("***Début du Model updatResetPassword***");
       // console.log(db);
       // console.log("req.body : ",req.body)
       let date = new Date();
            
        return    db.query("UPDATE author  SET resetPasswordToken=?, resetPasswordExpires=?  WHERE email=?", [token, date, email]).then((response) =>{
            console.log(response);
            return response;
        })
        .catch((error)=>{
            console.log("error : ", error);
            return error;
        })
    }
  
    static updatePassword(hashedPassword, email){
        console.log("***Début du Model updatePassword***");
      
        console.log("hashed password", hashedPassword)
       
            
        return    db.query("UPDATE author  SET password=?  WHERE email=?", [hashedPassword, email]).then((response) =>{
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