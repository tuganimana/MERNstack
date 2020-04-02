const express = require('express')
const mongoose =require('mongoose')

const  userSchema =mongoose.Schema({
  _id :mongoose.Types.ObjectId,
   firstname :{type:String,required:true},
   lastname:{type:String,required:true},
   telephone:{type:Number,required:true},
 username:{type:String,
  required:true,
  unique:true,
  match:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
   password:{type:String,required:true}, 
   verification:{type:String, default:'no'},
   verifycode:{type:String,}
 });
 module.exports = mongoose.model('user',userSchema);