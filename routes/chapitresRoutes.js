const cors =require("cors");
const { response } = require("express");

const bodyParser = require("body-parser");


module.exports = (app, db) => {
const chapitreModel = require('../models/chapitresModel')(db);
const withAuth = require("../withAuth");
app.use(cors());
app.use(bodyParser.json());
/*var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
*/

app.get("/readnovels-rle/chapitres/getAllByChapitresByRomanId/:id", async (req, res, next) =>{


    console.log("******Début de la route getAllChapitres**********");
    console.log("req.params : ",req.params);
    let chapitres = await chapitreModel.getAllChapitres(req.params.id);

    
    if(chapitres.code){
        return res.json({status: 500, msg: " Problème lors de la récupération des chapitres en bdd."})
     }
    return res.json({ status: 200, chapitres :chapitres})

})


app.post("/readnovels-rle/chapitres/register", async (req,res,next) =>{


    console.log("******Début de la route register chapitre**********");
    console.log("req.body : ",req.body);
    let chapitre = await chapitreModel.registerChapitre(req);

    
    if(chapitre.code){
        return res.json({status: 500, msg: " Problème lors de l'enregistrement du chapitre en bdd."})
     }
    return  res.json({status: 200, msg :"Ok le chapitre a été ajouté."})
})


app.post("/readnovels-rle/chapitres/updateChapitre", async (req,res,next) =>{


    console.log("******Début de la route update chapitre**********");
    console.log("req.body : ",req.body);
   
    
    

    return  res.json({status: 200, msg :"Ok le nombre de chapitres a bien été incrémenté"})
})



}