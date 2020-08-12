const cors =require("cors");
const { response } = require("express");
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
const bodyParser = require("body-parser");
let salt = bcrypt.genSaltSync(10);
const secret = "freya";
module.exports = (app, db) => {
const readerModel = require('../models/readerModel')(db);
const withAuthReader = require("../withAuthReader");
app.use(cors());
app.use(bodyParser.json());
/*var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
*/

app.get("/readnovels-rle/readers/getAllReaders", async (req, res, next) =>{

    res.json({ status: 200, readers : "Rominou-chan,  EmyBooby"
    })

})


app.post("/readnovels-rle/readers/register", async (req,res,next) =>{


    console.log("******Début de la route register reader**********");
    console.log("req.body : ",req.body);
    let reader1  = await readerModel.getReaderByEmail(req);
    if(reader1.length !== 0){
        return res.json({status: 500, msg: " Il existe déjà un utilisateur avec ce mail."})
     }
    let reader = await readerModel.registerReader(req);

    
    if(reader.code){
        return res.json({status: 500, msg: " Problème lors de l'enregistrement du lecteur en bdd."})
     }
    return  res.json({status: 200, msg :"Ok le lecteur a été ajouté."})
})

app.post("/readnovels-rle/readers/login", async (req, res, next) => {

    console.log("*******Début de la route login reader********");
    //console.log("req.body : ",req.body);

    let reader  = await readerModel.getReaderByEmail(req);

    if(reader.length === 0){
        res.json({status: 404, msg: 'Pas de lecteur avec ce mail'});

    }
    bcrypt.compare(req.body.password, reader[0].password)
         .then((same) =>{
            console.log('same', same);
				
            if (same === true) {
                const payload = { email: req.body.email, id:reader[0].id };
                const token = jwt.sign(payload, secret);
                console.log('token', token);
                let readerConnected = {
                    firstName : reader[0].firstName,
                    lastName : reader[0].lastName,
                    email : reader[0].email,
                    address: reader[0].address,
                    zip: reader[0].zip,
                    city: reader[0].city,
        
                    
                }
                res.json({ status: 200, token:token, reader: readerConnected }) 
                
            }else {
                console.log("ON passe là si same est false")
                     res.json({
                    status: 401,
                       msg: 'Votre mot de passe est incorrect'
                 })
                }  
         })
         .catch((error) =>{
            console.log("error ", error)
         })

})
app.put("/readnovels-rle/readers/update", async (req,res,next) =>{


    console.log("******Début de la route update reader**********");
    console.log("req.body : ",req.body);
    let reader = await readerModel.updateReader(req);

    
    if(reader.code){
        return res.json({status: 500, msg: " Problème lors de l'enregistrement de l'auteur en bdd."})
     }
    return  res.json({status: 200, msg :"Ok l'auteur a été ajouté."})
})

app.post('/readnovels-rle/readers/updateImg', withAuthReader, async (req, res, next)=>{
    console.log('****Début route setImg*****')
    let reader = await readerModel.updateImg(req);
    console.log("***retour dans la route updateImg****")
    if(reader.code) {
        console.log("erreur code : " ,reader)
        res.json({status: 500, error : reader})
    }
    console.log("reader : ",reader)
    res.json({status: 200, result: reader})
})

}