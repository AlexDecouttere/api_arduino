var express = require('express');
var crypto = require("crypto")
var db_lib = require("./getDataFromDb.js");
const createHttpError = require("http-errors");
const jwt = require('jsonwebtoken');
const { env } = require('process');
const signing_Key = env.SIGNING_KEY;

var app = express();

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
   parsedCode = req.body['code']
   console.log('code '+parsedCode)
   parsedCodeFromDb = await db_lib.getDbData(parsedCode)
   console.log('code db '+parsedCodeFromDb)

   if(parsedCode === parsedCodeFromDb){
      res.status(200).send('Correct code')
   }
   else{
      res.status(200).send('Wrong Code')
   }  
 })

 const port = parseInt(process.env.PORT) || 8080;

var server = app.listen(port , function () {
   var host = server.address().address
   var port = server.address().port
})

function jsonParser(stringValue) {
   var string = JSON.stringify(stringValue);
   var objectValue = JSON.parse(string);
   return objectValue;
}

function hashRes(stringValue) {
   var res = crypto.createHash(algorithm).update(stringValue).digest("base64")
   return res;
}
