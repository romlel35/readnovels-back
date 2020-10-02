/* eslint-disable max-len */
/* eslint-disable no-console */





/**
 * @swagger
 * /forgotPassword:
 *   post:
 *     tags:
 *       - Users
 *     name: Forgot Password
 *     summary: Sends an email with a reset password link when a user inevitably forgets their password
 *     consumes:
 *       - application/json
 *     parameters:
 *      - name: body
 *        in: body
 *        schema:
 *          $ref: '#/definitions/User'
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *        required:
 *          - email
 *     responses:
 *       '200':
 *         description: Reset email sent
 *       '400':
 *         description: Email required
 *       '403':
 *         description: Email not found in db
 *
 */
let config;
if(!process.env.HOST_DB) {
    config = require('../config');
} else {
	config = require('../config_example');
}

const nodemailer = require('nodemailer');
const mailDev = config.mail;

module.exports = (app,db) => {
  const crypto = require('crypto');
  const authorModel = require('../models/authorModel')(db);
  const readerModel = require('../models/readerModel')(db);

  app.post('/forgotPassword', (req, res) => {

    console.log("****Début route forgotPssword********")
    if (req.body.email === '') {
      res.status(400).send('email required');
    }
    console.log(req.body.email);
    let email = req.body.email;
    let user = authorModel.getAuthorByEmail(req);
    let role = "author";
    if(user.length === 0){

      role = "reader";
      user = await readerModel.getReaderByEmail(req);
      if(user.length === 0){
        res.json({status: 404, msg: "Pas d'utilisateur avec ce mail"});
      }
    }
        let userEmail = req.body.email;
    
        const token = crypto.randomBytes(20).toString('hex');
      
        if (role === "author"){
          let updateResetPasswordToken = authorModel.updateResetToken(email,token);

        }
        else{
          let updateResetPasswordToken = readerModel.updateResetToken(email,token);

        }
       
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: mailDev.id,
            pass: mailDev.password,
          },
          tls: {
            rejectUnauthorized: false
        }
        });
//
        const mailOptions = {
          from: 'romlel35.dev@gmail.com',
          to: userEmail,
          subject: 'Link To Reset Password - LisDesRomans',
          text:
            'Vous recevez ceci car vous ou autre a demandé un nouveau mot de passe.\n\n'
            + 'Vous êtes priez de cliquer sur ce lien dans moins de 1 heure:\n\n'
            + `https://readnovels.herokuapp.com/reset/${token}\n\n`
            + "Si ce n'est pas vous qui êtes à,l'origine de ce message, ne cliquez pas. .\n",
        };

        console.log('sending mail');

        transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
            console.error('there was an error: ', err);
          } else {
            console.log('here is the res: ', response);
            res.status(200).json('recovery email sent');
          }
        });
      
    });
 
};