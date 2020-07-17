const cors =require("cors");
const { response } = require("express");
var bodyParser = require('body-parser');

module.exports = (app, db) => {
const authorModel = require('../models/authorModel')(db);

app.use(cors());
app.use(bodyParser.json());
/*var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
*/

app.get("/readnovels-rle/authors/getAllAuthors", async (req, res, next) =>{

    res.json({ status: 200, authors : "Rominou-chan, MarieSexy, EmyBooby"
    })

})


app.post("/readnovels-rle/authors/register", async (req,res,next) =>{


    console.log("******Début de la route register Author**********");
    console.log("req.body : ",req.body);
    let author = await authorModel.registerAuthor(req);

    
    if(author.code){
        return res.json({status: 500, msg: " Problème lors de l'enregistrement de l'auteur en bdd."})
     }
    return  res.json({status: 200, msg :"Ok l'auteur a été ajouté."})
})




}