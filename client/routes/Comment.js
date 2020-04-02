const express = require('express')
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/Post')
const Comment = require('../models/Comment')

 router.post('/',(req,res,next)=>{
     const comments= new Comment({
         _id:mongoose.Types.ObjectId(),
         content:req.body.content,
         pictures:req.body.pictures,
         user:req.body.user,
         page:req.body.page
     })
    
    comments.save().then(result =>{
         console.log(result)
         res.status(201).json({
            message:'successful',
            createdPost:result,
        })
     }).catch(err=>{
         console.log(err);
         res.status(500).json({
            error:err
        })
     });
    
 });

 router.get('/:postId',(req,res,next)=>{
     const id = req.params.postId;
     Comment.findById(id)
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
 })
 router.get('/',(req,res,next)=>{
    const id = req.params.postId;
    // aha ushobora gushyiraho where, limit
    Comment.find().limit(2)
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
   Comment.remove({_id:id})
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
 });
 router.put('/',(req,res,next)=>{
     res.status(200).json({
         message:'well done PUT'
     })
 });

 router.patch('/:postId',(req,res,next)=>{
    
     const id = req.params.postId;
    //  kwa updating  - dukoresheje variable set  inzira yambere
      Comment.update({_id:id},{$set:{
   
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
    // ==================================nkore ops ya updating byose
// const updateOps ={};
// for(const ops of req.body){
//     updateOps[ops.propName] =ops.value;
// }
//  Post.update({_id:id},{$set:updateOps}).exec()


 })
module.exports = router;
