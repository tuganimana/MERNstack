const mongoose =require('mongoose');
 const  domainSchema =mongoose.Schema({
  _id :mongoose.Types.ObjectId,
   title :{type:String},
   content:{type:String},
   pictures:{type:String},
  
   addedon:String
 });
 module.exports = mongoose.model('Domains',domainSchema);
