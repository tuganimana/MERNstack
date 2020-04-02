const mongoose =require('mongoose');
 const  commentSchema =mongoose.Schema({
  _id :mongoose.Types.ObjectId,

   post :{type:mongoose.Types.ObjectId, ref:'Post',required:true},
   content:{type:String,required:true},
   pictures:String,
   user:String,
   page:{type:Number,required:true}, 
 });
 module.exports = mongoose.model('Comment',commentSchema);
