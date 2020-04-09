const mongoose =require('mongoose');
 const  postSchema =mongoose.Schema({
  _id :mongoose.Types.ObjectId,
   title :{type:String},
   content:{type:String},
   pictures:String,
   category:{type:String},
 user:String,
   page:{type:Number}, 
   addedon:String
 });
 module.exports = mongoose.model('Post',postSchema);
