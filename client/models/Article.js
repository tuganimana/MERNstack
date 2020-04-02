var bcrypt = require('bcrypt-nodejs');
var db = require('../Database/db');
var id = require('mongoose').Types.ObjectId;

var Page = function(data){
  this.id = new id();
  this.updatedAt =  (new Date()).getTime();
  this.createdAt =  (new Date()).getTime();
}
module.exports = Page;
