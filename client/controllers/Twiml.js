const mongoose = require('mongoose');
const Calls = require('../models/Twiliocall');
var xml = require('xml');
// gukora post
exports.make_ml =(req,res,next)=>{
    const accountSid = 'ACc6a6d3f28e2b173e68bbe2f075c66943';
    const authToken = '6ffaff8edc784b75c7c20a781031203a';
    const client = require('twilio')(accountSid, authToken);
 
    
    const VoiceResponse = require('twilio').twiml.VoiceResponse;


const response = new VoiceResponse();
response.say('Welcome to Conn Pro- ');
response.record('user');
console.log(response.toString());
kir=response
res.type('application/xml');
res.send(response.toString())
console.log(response.toString());


  
//     if (! req.file || ! req.file.path) {
//         console.log(req.file)
//         return res.status(408);
//       }
//    //   adding models

   
}
// get post

