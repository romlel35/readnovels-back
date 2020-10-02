module.exports = (app,db)  =>{
    const authorModel = require('../models/authorModel')(db);


    app.get("/readnovels-rle/reset/:token", async (req,res,next) =>{


        console.log("******Début de la route reset password**********");
        console.log("req.body : ",req.params);
        let token = req.params.token;
       let author = await authorModel.getAuthorByPasswordToken(token);
       console.log("author : ", author)
       if(author.code){
        return res.json({status: 500, msg: " Le lien de récupération est invalide ou le temps a été dépassé"})
        }  
        return res.json({status: 200, msg: "Le lien de récupération de mot de passe est ok", auteur: author[0]}) 

    })



}