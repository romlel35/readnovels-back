const cors =require("cors");
const { response } = require("express");
const jwt = require('jsonwebtoken');

const bcrypt = require('bcryptjs');
const bodyParser = require("body-parser");
let salt = bcrypt.genSaltSync(10);
const secret = "kitty";

module.exports = (app, db) => {
    const authorModel = require('../models/authorModel')(db);
    const withAuth = require("../withAuth");
    app.use(cors());
    app.use(bodyParser.json());
    /*var corsOptions = {
        origin: 'http://example.com',
        optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
    }
    */

   


    app.post("/readnovels-rle/authors/register", async (req,res,next) =>{


        console.log("******Début de la route register Author**********");
        console.log("req.body : ",req.body);
        let author1  = await authorModel.getAuthorByEmail(req);
        if(author1.length !== 0){
            return res.json({status: 500, msg: " Il existe déjà un utilisateur avec ce mail."})
        }
        let author = await authorModel.registerAuthor(req);

        
        if(author.code){
            return res.json({status: 500, msg: " Problème lors de l'enregistrement de l'auteur en bdd."})
        }
        return  res.json({status: 200, msg :"Ok l'auteur a été ajouté."})
    })

    app.post("/readnovels-rle/authors/login", async (req, res, next) => {

        console.log("*******Début de la route login Author********");
        console.log("req.body : ",req.body);

        let author  = await authorModel.getAuthorByEmail(req);

        if(author.length === 0){
            res.json({status: 404, msg: 'Pas dauteur avec ce mail'});

        }
        bcrypt.compare(req.body.password, author[0].password)
            .then((same) =>{
                console.log('same', same);
                    
                if (same === true) {
                    const payload = { email: req.body.email, id:author[0].id };
                    const token = jwt.sign(payload, secret);
                    console.log('token', token);
                    let authorConnected = {
                        firstName : author[0].firstName,
                        lastName : author[0].lastName,
                        email : author[0].email,
                        address: author[0].address,
                        zip: author[0].zip,
                        city: author[0].city,
            
                        
                    }
                    res.json({ status: 200, token:token, author: authorConnected }) 
                    
                }else {
                    console.log("ON passe là si same est false")
                        res.json({
                        status: 401,
                        error: 'Votre mot de passe est incorrect'
                    })
                    }  
            })
            .catch((error) =>{
                console.log("error ", error)
            })

    })
    app.post("/readnovels-rle/authors/updateAuthor", async (req,res,next) =>{


        console.log("******Début de la route update Author**********");
        console.log("req.body : ",req.body);
        let author = await authorModel.updateAuthor(req);

        
        if(author.code){
            return res.json({status: 500, msg: " Problème lors de l'enregistrement de l'auteur en bdd."})
        }
        return  res.json({status: 200, msg :"Ok l'auteur a été ajouté."})
    })
    app.put("/readnovels-rle/UpdatePasswordViaEmail", async (req,res,next) =>{
        console.log("*****Déébut de la route update password*******")
        console.log("req.body : ",req.body)
        bcrypt.hash(req.body.password, salt).then((hashedPassword) =>{
            
            let author = authorModel.updatePassword(hashedPassword,req.body.email)
            if(author.code){
                return res.json({status: 500, msg: "problème lors de la maj du mot de passe"})
            }
            return res.json({status: 200, msg :"Ok le mot de passe a été mis à jour"})

        })
    })

    app.post('/readnovels-rle/authors/updateImg', withAuth, async (req, res, next)=>{
        console.log('****Début route setImg*****')
        let author = await authorModel.updateImg(req);
        console.log("***retour dans la route updateImg****")
        if(author.code) {
            console.log("erreur code : " ,author)
            res.json({status: 500, error : author})
        }
        console.log("author : ",author)
        res.json({status: 200, result: author})
    })

}