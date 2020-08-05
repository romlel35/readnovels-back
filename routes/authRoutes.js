const withAuth = require('../withAuth');
const withAuthReader = require('../withAuthReader');
const jwt = require('jsonwebtoken');


module.exports = function (app, connection) {
	const authorModel = require('../models/authorModel')(db);
	const readerModel = require('../models/readerModel')(db);
	
	app.get('/readnovels-rle/authors/checkToken',withAuth , async (req, res, next)=>{

		console.log("************Nous sommes dans la route Auth monseigneur***********")
	    //console.log(" req dans checkTOken : ",req.body)
	    let author = await authorModel.getAuthorById(req.id);
	    if(author.code){
			res.json({status: 500, msg: "Problème lors de la récupération de l'auteur"})
		}
	    res.json({ status: 200, author: author })
	})
	app.get('/readnovels-rle/readers/checkToken',withAuthReader , async (req, res, next)=>{

		console.log("************Nous sommes dans la route Auth monseigneur***********")
	    console.log(" req dans checkTOken : ",req.body)
	    let reader = await readerModel.getReaderById(req.id);
	    if(reader.code){
			res.json({status: 500, msg: "Problème lors de la récupération du lecteur"})
		}
	    res.json({ status: 200, reader: reader })
	})
}