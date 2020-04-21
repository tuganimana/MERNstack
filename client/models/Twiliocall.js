const mongoose =require('mongoose');
 const  callSchema =mongoose.Schema({
  _id :mongoose.Types.ObjectId,
   phonenumber :{type:String},
   names:{type:String},
   service:{type:String},
   user:String,
  
   addedon:String
 });
 module.exports = mongoose.model('Twiliocall',callSchema);
