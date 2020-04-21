const mongoose = require('mongoose');
const Calls = require('../models/Twiliocall');
// gukora post
exports.make_call =(req,res,next)=>{
    const accountSid = 'ACc6a6d3f28e2b173e68bbe2f075c66943';
    const authToken = '6ffaff8edc784b75c7c20a781031203a';
    const client = require('twilio')(accountSid, authToken);
    const callback='https://api.twilio.com/2010-04-01/Accounts/'+{accountSid}+'/Calls.json'

    const VoiceResponse = require('twilio').twiml.VoiceResponse;


const response = new VoiceResponse();
response.say('Welcome to Conn Pro- ');

console.log(response.toString());

    client.calls.create({
            method: 'GET',
            statusCallback: 'https://www.myapp.com/events',
            statusCallbackEvent: ['initiated', 'answered'],
            statusCallbackMethod: 'POST',
            url: response.toString(),
            to:req.body.phonenumber,
            from: '+12058139982'
           })
          .then(call => {
            console.log(call.sid)
            console.log(callback)
            call.status(200).json({
                result:call
            })

            const posts = new Twiliocall({
                _id: new mongoose.Types.ObjectId(),
                phonenumber :req.body.phonenumber,
          names:req.body.names,
         service:req.body.service,
         user:req.body.user,
          addedon:new Date()
        
            })
        
        
            posts.save().then(result =>{
                console.log(result)
                res.status(201).json({
                   message:'well done POST',
                   createdPost:result,
               })
            }).catch(err=>{
                console.log(err);
                
                res.status(500).json({
                   error:err
               })
            });
          })
          .catch(error=>{
              console.log(error)
          });
  
//     if (! req.file || ! req.file.path) {
//         console.log(req.file)
//         return res.status(408);
//       }
//    //   adding models

   
}
// get post

exports.get_somepost=(req,res,next)=>{
    const title = req.params.postId;
    Post.find({title:title}).limit(1).sort({id:-1})
    .exec()
    .then(result=>{
        if(result){
           res.status(200).json(result)    
        }else{
           res.status(404).json({
               message:'No valid data'
           })
        }
    })
    .catch(err=>{
       res.status(500).json({
           error:err,
          
       })
    }
        
    )
}

// get all ---icyarimwe

exports.get_allpost=(req,res,next)=>{
    const id = req.params.postId;
    // aha ushobora gushyiraho where, limit
    Post.find().limit(10).sort({_id:-1})
    .exec()
    .then(result=>{
        if(result.length>=0){
           res.status(200).json(result)    
        }else{
           res.status(404).json({
               message:'No valid data'
           })
        }
    })
    .catch(err=>{
       res.status(500).json({
           error:err,
          
       })
    }
        
    )
}

// del
exports.delete_post=(req,res,next)=>{
    //  ku deleteing 
    const id = req.params.postId
   Post.deleteOne({_id:id})
   .exec()
   .then(
       result=>{
           console.log(result);
         if(result){
            res.status(200).json({
                message:'successful',
                result:result
            })
         } else{
            res.status(404).json({
                message:"fails to delete"
            })
         }
       }
   )
   .catch(error=>{
       res.status(500).json({
           error:error,

       })
   })

     res.status(200).json({
         message:'well done DELET'
     })
 }

//  updating post

exports.update_post=(req,res,next)=>{
    
    const id = req.params.postId;
   //  kwa updating  - dukoresheje variable set  inzira yamberekk
     Post.update({_id:id},{$set:{
         title:req.body.title,
         content:req.body.content,
        pictures:req.body.pictures,
        user:req.body.user,
        page:req.body.page
     }}) .then(result=>{
       res.status(200).json({
           message:"successful updated",
           result:result
       })
   })
   .catch(
       err=>{
           res.status(500).json({
               error:err,
           })
       }
   )


}