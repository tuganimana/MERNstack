const mongoose = require('mongoose');
const Domains = require('../models/Domains');
// gukora post
exports.create_post=(req,res,next)=>{
  
    if (! req.file || ! req.file.path) {
        console.log(req.file)
        return res.status(408);
      }
   //   adding models
    const domains= new Domains({
        _id: new mongoose.Types.ObjectId(),
        title :req.body.title,
        pictures:req.file.path,
 
  addedon:new Date()

    })
    domains.save().then(result =>{
        console.log(result)
        res.status(201).json({
           message:'Successful added',
           createdPost:result,
       })
    }).catch(err=>{
        console.log(err);
        
        res.status(500).json({
           error:err
       })
    });
   
}
// get post


exports.get_allpost=(req,res,next)=>{
    const id = req.params.postId;
    // aha ushobora gushyiraho where, limit
    Domains.find().limit(20).sort({_id:-1})
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


exports.get_somepost=(req,res,next)=>{
    const title = req.params.postId;
    Domains.find({title:title}).limit(1).sort({id:-1})
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

// del
exports.delete_post=(req,res,next)=>{
    //  ku deleteing 
    const id = req.params.postId
    Domains.deleteOne({_id:id})
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
   Domains.update({_id:id},{$set:{
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