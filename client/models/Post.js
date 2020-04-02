const mongoose =require('mongoose');
 const  postSchema =mongoose.Schema({
  _id :mongoose.Types.ObjectId,
   title :{type:String,required:true},
   content:{type:String,required:true},
   pictures:String,
 user:String,
   page:{type:Number,required:true}, 
 });
 module.exports = mongoose.model('Post',postSchema);
