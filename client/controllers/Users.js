const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const randomString = require('random-string');
const nodemailer = require("nodemailer");
const sgMail = require('@sendgrid/mail');
const jwt =require('jsonwebtoken');

exports.create_user=(req,res,next)=>{
   
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
                usertype:req.body.usertype
                
            
        });
        users.save().then(result =>{
            // sending email
sgMail.setApiKey('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');        
const msg = {
  to: req.body.username,
  from: 'info@idatech.rw',
  subject: 'Account verification-',
  text: 'Verify now',
  html: '<h1>your verification code is <strong>: '+xnumber+' </strong></h1>',
};
sgMail.send(msg);
          console.log(result)
          res.status(201).json({
             message:'successful created',
             result:result

            
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

     
    
 }

//  login function aha

exports.user_login=(req,res,next)=>{


    User.find({username:req.body.username}).exec()
    .then(
        result=>{
            console.log(result)

            if(result.length<1){
                return  res.status(401).json({
                    message:'Auth failed'
                })
            }

            bcrypt.compare(req.body.password, result[0].password,(error,response)=>{
                if(error){
                    return  res.status(401).json({
                        message:'Auth failed'
                    }) 
                }

                if(response ===true &&result[0].verification==='yes'){
                    // =======token
                 const token = jwt.sign({
                        username:result[0].username,
                        userId:result[0]._id

                    },
                    'chance',{
                       expiresIn: "10h"
                    }

                    )

                    // =====end ya token 
                    return  res.status(200).json({
                        message:'successful',
                        token:token,
                        usertype:result[0].usertype,
                        username:result[0].username,
                        firstname:result[0].firstname
                        
                         
                    }) 
                }else{
                    console.log(response.status)
                    return  res.status(205).json({
                        message:'your account is not verified'
                    }) 
                }

                return  res.status(401).json({
                    message:'Auth failed'
                }) 

            })
        }
    )
    .catch(err=>{
        res.status(500).json({
            error:err,
           
        })
     })
}

// kubona aba users  bose

exports.get_allusers=(req,res,next)=>{
    const id = req.params.postId;
    // aha ushobora gushyiraho where, limit
    User.find().limit(100).sort({_id:-1})
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

// gusiba umu users

exports.delete_user=(req,res,next)=>{
    //  ku deleteing 
    const id = req.params.userid
   User.deleteOne({_id:id})
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

    
 }

//  guindura

exports.update_user=(req,res,next)=>{
    
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
 

}

// ku verifier umu user

exports.user_verification=(req,res,next)=>{
   
    const verifycode = req.body.verifycode;
    const username = req.body.username;
   //  kwa updating  - dukoresheje variable set  inzira yambere

User.find({$and:[{verifycode:verifycode},{username:username}]})
   .exec()
   .then(result=>{
       if(result.length>=1){

        User.update({verifycode:verifycode},{$set:{
        
            verification:'yes'
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
     
       }else{
           console.log(result)
        res.status(405).json({
            message:'Incorrect code',
            statuscode:405
        })
       }
     
   })
   .catch(
       error=>{
           console.log(error)
           res.status(500).json({
               error:error,
               message:'no user found'
           })
       }
   )
    
 

}