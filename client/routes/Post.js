const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Post = require('../models/Post');
const multer = require('multer');

const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './uploads');
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString()+file.originalname);
    }

})
const upload =multer({storage:storage});
 router.post('/',upload.single('pictures'),(req,res,next)=>{
     console.log(req.file)
      const post={
          name:req.body.name,
          description: req.body.description
      };
    //   adding models
     const posts = new Post({
         _id: new mongoose.Types.ObjectId(),
         title :req.body.title,
   content:req.body.content,
   pictures:req.body.pictures,
   user:req.body.user,
   page:req.body.page,

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
    
 });

 router.get('/:postId',(req,res,next)=>{
     const id = req.params.postId;
     Post.findById(id)
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
    Post.find().limit(2)
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
   Post.remove({_id:id})
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
    // ==================================nkore ops ya updating byose
// const updateOps ={};
// for(const ops of req.body){
//     updateOps[ops.propName] =ops.value;
// }
//  Post.update({_id:id},{$set:updateOps}).exec()


 })
module.exports = router;
