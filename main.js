var express = require('express');
var crypto = require("sha256")
var CryptoJS = require("crypto-js");

var db_lib = require("./getDataFromDb.js");
const createHttpError = require("http-errors");
const jwt = require('jsonwebtoken');
const { env } = require('process');
const signing_Key = env.SIGNING_KEY;

var app = express();
var algorithm = "sha256"

app.use(express.json());

app.use(function(req, res, next) {
   const bearerHeader = req.headers['authorization'];  
   //check if bearer is undefined  
   if(typeof bearerHeader != 'undefined'){  
      //split at the space  
      const bearer = bearerHeader.split(' ');
      //Get the token from array  
      const bearerToken = bearer[1];  
      // verify the token
      jwt.verify(bearerToken, signing_Key,(err)=>{  
         if(err){  
            res.status(401).send('Unauthorized token given');  
         }else{  
            next(); 
         }  
      });
   }else{  
      //Forbidden  
      res.status(401).send('No token given');  
   }  
 });

app.post('/check', async function (req, res) {
   code = req.body['code']
   console.log('code '+ code)
   //const hashCode = hashRes(code);

   parsedCodeFromDb = await db_lib.getDbData(code)
   console.log('code db '+parsedCodeFromDb)

   console.log(code);
   console.log(parsedCodeFromDb);

   if(Number(code) === Number(parsedCodeFromDb)){
      res.status(200).send('{ "response": "Correct code" }')
   }
   else{
      res.status(200).send('{ "response": "Wrong code" }')
   }  
 })

 const port = parseInt(process.env.PORT) || 8080;

var server = app.listen(port , function () {
   var host = server.address().address
   var port = server.address().port
})

function hashRes(stringValue) {
   var res = CryptoJS.SHA256(parseInt(stringValue)).toString(CryptoJS.enc.Base64);
   return res;
}