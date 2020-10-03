const readerModel = require('../models/readerModel');

module.exports = (app,db)  =>{
    const authorModel = require('../models/authorModel')(db);
    const readerModel = require("../models/readerModel")(db);

    app.get("/readnovels-rle/reset/:token", async (req,res,next) =>{


        console.log("******Début de la route reset password**********");
        console.log("req.body : ",req.params);
        let token = req.params.token;
       let user = await authorModel.getAuthorByPasswordToken(token);
      console.log("user : ", user)
       if(user.length === undefined){

             user = await readerModel.getReaderByPasswordToken(token);
            if (user.length === undefined) {
                return res.json({status: 500, msg: " Le lien de récupération est invalide ou le temps a été dépassé"})
        
            }
            return res.json({status: 200, msg: "Le lien de récupération de mot de passe est ok", user: user[0]}) 

        }  
        return res.json({status: 200, msg: "Le lien de récupération de mot de passe est ok", user: user[0]}) 

    })



}