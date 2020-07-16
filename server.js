const express = require("express");
const app = express();



app.use(express.static(__dirname + '/public'));



//On choisi le port
const PORT = 8000;
app.listen(process.env.PORT || 8000, ()=>{
	console.log('listening port '+PORT+' all is ok');
})

//route basique de test
app.get("/",  async (req, res, next)=>{
                
            
    res.json({ status: 200, msg:"ok google" })
});