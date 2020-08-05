const cors =require("cors");
const { response } = require("express");

const bodyParser = require("body-parser");


module.exports = (app, db) => {
const romanModel = require('../models/romanModel')(db);
const withAuth = require("../withAuth");
app.use(cors());
app.use(bodyParser.json());
/*var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
*/

app.get("/readnovels-rle/romans/getAll", async (req, res, next) =>{
    console.log("******Début de la route getAll**********");
    let romans = await romanModel.getAllRomans();
    if(romans.code){
        return res.json({status: 500, msg: " Problème lors de l'a récupération des romans en bdd."})
     }

     console.log("romans de la route : ",romans)
    return res.json({ status: 200, romans : romans})

})
app.get("/readnovels-rle/romans/getRomanById/:id", async (req, res, next) =>{
    console.log("******Début de la route getRomanById**********");
    let id = req.params.id;
    let roman = await romanModel.getRomanById(id);
    if(roman.code){
        return res.json({status: 500, msg: " Problème lors de l'a récupération du roman en bdd."})
     }

     console.log("romans de la route : ",roman)
    return res.json({ status: 200, roman : roman})

})

app.get("/readnovels-rle/romans/getAllByAuthorId/:id", async (req, res, next) =>{
    console.log("******Début de la route getAllByAuthorId**********");
  
    let id = req.params.id;
    console.log("req.params : ",req.params)
    let romans = await romanModel.getAllRomansByAuthorId(id);
    if(romans.code){
        return res.json({status: 500, msg: " Problème lors de l'a récupération des romans en bdd."})
     }

     console.log("romans de la route getAllbyAuthorID : ",romans)
    return res.json({ status: 200, romans : romans})

})


app.post("/readnovels-rle/romans/register", async (req,res,next) =>{


    console.log("******Début de la route register roman**********");
    console.log("req.body : ",req.body);
    let roman = await romanModel.registerRoman(req);

    
    if(roman.code){
        return res.json({status: 500, msg: " Problème lors de l'enregistrement de l'auteur en bdd."})
     }
    return  res.json({status: 200, msg :"Ok le roman a été ajouté."})
})


app.post("/readnovels-rle/romans/update", async (req,res,next) =>{


    console.log("******Début de la route update roman**********");
    console.log("req.body : ",req.body);
    let roman = await romanModel.getRomanById(req.body.id);
    if(roman.code){
        return res.json({status: 500, msg: " Problème lors de la récupération du nombre de chapitres."})
     }

    let roman2 = await romanModel.updateRoman(roman);
    if(roman2.code){
        return res.json({status: 500, msg: " Problème lors de l'incrémentation du nombre de chapitres"})
     }
    
    

    return  res.json({status: 200, msg :"Ok le nombre de chapitres a bien été incrémenté"})
})

app.post('/readnovels-rle/romans/updateImg', withAuth, async (req, res, next)=>{
    console.log('****Début route setImg*****')
    let roman = await romanModel.updateImg(req);
    console.log("***retour dans la route updateImg****")
    if(roman.code) {
        console.log("erreur code : " ,roman)
        res.json({status: 500, error : roman})
    }
    console.log("roman : ",roman)
    res.json({status: 200, result: roman})
})

app.delete('/readnovels-rle/romans/delete/:id' , withAuth, async (req, res, next) => {
    console.log("**********début route delete Roman");
    let id = req.params.id;
    let roman  = await romanModel.deleteRoman(id);
    if(roman.code) {
        console.log("erreur code : " ,roman)
        res.json({status: 500, error : roman})
    }
    console.log("roman : ",roman)
    res.json({status: 200, result: roman})
})

}