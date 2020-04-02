var db = require('../Database/db');
var id = require('mongoose').Types.ObjectId;

var Verification = function(data){
  this.id = new id();
  this.code = data.code;
  this.email = data.email;
  this.verified = false;
  this.updatedAt = (new Date()).getTime();
  this.createdAt = (new Date()).getTime();
}

Verification.prototype.create = function(callback){
  db.cypher({
    query: "MATCH (u:User{email: {email}}) WITH u MERGE (v:Verification{id: {id}, code: {code}, verified: {verified}, updatedAt: {updatedAt}, createdAt: {createdAt}})-[:USER]->(u) RETURN properties(v) AS verification , u.name AS name, u.email as email",
    params: this,
  },callback);
}

Verification.verify = function(data,callback){
  db.cypher({
    query: "MATCH (v:Verification{code: {code}, verified: {verified}})-[:USER]->(u:User{email: {email}}) SET v.verified = {newState}, v.updatedAt = {updatedAt} RETURN properties(v)",
    params: data,
  },callback);
}

module.exports = Verification;
