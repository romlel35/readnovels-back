

module.exports = (_db)=>{
    db = _db;
    return romanModel;
}

const bcrypt = require("bcryptjs");
let salt = bcrypt.genSaltSync(10);


class romanModel{
 
    

    static registerRoman(req){
        console.log("***Début du Model RegisterRoman***");
       // console.log(db);
        console.log("req.body : ",req.body)
      
            
        return    db.query("INSERT INTO romans  (title, author_id, category, summary, price, creationTimestamp)  VALUES (?,?,?,?,?, NOW())", [req.body.title, req.body.author_id, req.body.category, req.body.summary, req.body.price]).then((response) =>{
            console.log(response);
            return response;
        })
        .catch((error)=>{
            console.log("error : ", error);
            return error;
        })
    }
    static updateRoman(req){
        console.log("***Début du Model updateRoman***");
       // console.log(db);
        console.log("req.body : ",req.body)
       
        return    db.query("UPDATE romans SET nbr_chapters =?  ", [req.body.nbr_chapters+1]).then((response) =>{
            console.log(response);
            return response;
        })
        .catch((error)=>{
            console.log("error : ", error);
            return error;
        })
    }
    
    static getRomanById(id){
        console.log("***Début Model GetRomanById*****");
       console.log("id : ",id)
        return db.query("SELECT * from romans WHERE id=?",[id])
        .then((response) =>{
            console.log(response);
            return response;
        })
        .catch((error)=>{
            console.log("error : ", error);
            return error;
        })
    }

    static getAllRomans(){
        console.log("***Début Model GetAll*****");
       
        return db.query("SELECT * from romans")
        .then((response) =>{
            console.log("réponse du model : ",response)
            return response;
        })
        .catch((error)=>{
            console.log("error : ", error);
            return error;
        })
    }
    static getAllRomansByAuthorId(id){
        console.log("***Début Model GetAllByAuthorId*****");
       console.log("id : ",id)
        return db.query("SELECT * from romans WHERE author_id=?",[id])
        .then((response) =>{
            console.log("réponse du model : ",response)
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
		return db.query('UPDATE romans SET imgUrl = ? WHERE id = ?', [req.body.imageUrl, req.body.id])
				.then((result)=>{
					console.log('resultatttt',result);
					return result;
				})
				.catch((err)=>{
					return err;
				})
	}

    static deleteRoman(id) {
		console.log("***Delete Roman  : ",id)
	    return db.query('DELETE FROM romans WHERE id =? ', [id])
    	.then((result)=>{

			return result;
		})
		.catch((err)=>{
				return err;
		})
    }

    static addOrder(roman_id, reader_id) {
    console.log('**** Debut Model AddToLibrary *****')
      console.log("roman_id et read_id : "+roman_id+ " "+ reader_id)
        
      return db.query('INSERT INTO booksowned  (roman_id, reader_id, creationTimestamp)  VALUES (?,?,NOW())',[roman_id, reader_id]).then((result)=>{
					console.log('resultatttt',result);
					return result;
				})
				.catch((err)=>{
					return err;
				})
	}

    
  


    
	static   getRomansByReaderId(id){
        console.log("***Début Model   getRomansByReaderId*****");
       console.log("id : ",id)
        return db.query("SELECT * from romans r inner join booksowned b WHERE r.id = b.roman_id AND b.reader_id =?",[id])
        .then((response) =>{
            console.log("réponse du model : ",response)
            return response;
        })
        .catch((error)=>{
            console.log("error : ", error);
            return error;
        })
    }





}