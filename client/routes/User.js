
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const randomString = require('random-string');
const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail');

 router.post('/signup',(req,res,next)=>{
   
    //   adding models
User.find({username:req.body.username})
.exec()
.then(user=>{
    if(user.length>=1){
        return res.status(409).json({
            message:'User exists',
            status:'409'
        })
    }else{

        bcrypt.hash(req.body.password, 10,(err,hash)=>{
            if(err){
                return res.status(500).json({
                    error:err,
                    
                })
              }else{

                var xnumber = randomString({
                    length: 6,
                    numeric: true,
                    letters: true,
                    special: false,
                    
                    });
                  const users = new User({
                      _id: new mongoose.Types.ObjectId(),
                      firstname:req.body.firstname,
                lastname:req.body.lastname,
                username:req.body.username,
                telephone:req.body.telephone,
                password:hash,
                verifycode:xnumber,
                
            
        });
        users.save().then(result =>{
            // sending email
sgMail.setApiKey('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');        
const msg = {
  to: 'tuganimana01@gmail.com',
  from: 'info@tantine.rw',
  subject: 'Account verification-',
  text: 'Verify now',
  html: '<strong>your verification code is '+xnumber+' </strong>',
};
sgMail.send(msg);
          console.log(result)
          res.status(201).json({
             message:'successful created',

            
         })
      }).catch(err=>{
          console.log(err);
          res.status(500).json({
             error:err,
             message:'500'
         })
      });
      
      }
      
           })

    }
})
.catch(error=>{
    res.status(500).json({
        error:error
    })
})

     
    
 });

 router.get('/',(req,res,next)=>{
    const id = req.params.postId;
    // aha ushobora gushyiraho where, limit
    User.find().limit(2)
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
})

 router.delete('/:postId',(req,res,next)=>{
    //  ku deleteing 
    const id = req.params.postId
   User.remove({_id:id})
   .exec()
   .then(
       result=>{
           console.log(result);
         if(result){
            res.status(200).json({
                message:'successful deleted',
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
 });
 router.put('/',(req,res,next)=>{
     res.status(200).json({
         message:'well done PUT'
     })
 });

 router.patch('/update',(req,res,next)=>{
    
     const id = req.params.postId;
    //  kwa updating  - dukoresheje variable set  inzira yambere
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
  

 })


//  ku verifying

router.put('/',(req,res,next)=>{
    res.status(200).json({
        message:'well done PUT'
    })
});

router.patch('/verification',(req,res,next)=>{
   
    const id = req.params.postId;
   //  kwa updating  - dukoresheje variable set  inzira yambere

   User.find({})
     Post.update({_id:id},{$set:{
        
        verification:req.body.page
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
 

})
module.exports = router;
