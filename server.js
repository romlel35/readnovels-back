const express = require("express");
const app = express();
const mysql = require("promise-mysql");
const bodyParser = require("body-parser");
const cors = require("cors");



//on ne met pas nos paramètres de configuration en ligne
let config;
if(!process.env.HOST_DB) {
    config = require('./config');
} else {
	config = require('./config_example');
}
const host = process.env.HOST || config.db.host;
const user = process.env.USER || config.db.user;
const password = process.env.PASSWORD || config.db.password;
const db = process.env.DATABASE_DB ||config.db.database;

app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(bodyParser.json());


//On choisi le port
const PORT = 8000;
app.listen(process.env.PORT || 8000, ()=>{
	console.log('listening port '+PORT+' all is ok');
})
 



mysql.createConnection({
    host: host,
    database: db,
    user : user,
    password: password

}).then((db) => {
    
    console.log("***Connected to readnovels database***");
    //console.log("****DB **********", db)
    //le code ci-dessous permet de rester connecté
    setInterval(async function () {
        let res = await db.query('SELECT 1');
    }, 20000);

    //route basique de test
    app.get("/",  async (req, res, next)=>{
                    
                
        res.json({ status: 200, msg:"ok google" })
    });


    //routes : 
    const authorsRoutes = require("./routes/authorRoutes.js");
    authorsRoutes(app,db);
 
    const authRoutes = require("./routes/authRoutes.js");
    authRoutes(app);

    const romansRoutes = require("./routes/romansRoutes");
    romansRoutes(app, db);

    const chapitresRoutes = require("./routes/chapitresRoutes");
    chapitresRoutes(app, db);

    const readersRoutes = require("./routes/readerRoutes");
    readersRoutes(app, db);
})

