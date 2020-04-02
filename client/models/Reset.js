var db = require('../Database/db');
var id = require('mongoose').Types.ObjectId;

var PassReset = function(data){
  this.id = new id();
  this.email = data.email;
  this.state = data.state;
  this.updatedAt = (new Date()).getTime();
  this.createdAt = (new Date()).getTime();
}

PassReset.prototype.create = function(callback){
  db.cypher({
    query: "MATCH (u:User{email: {email}}) WITH u MERGE (r:Reset{id: {id}, password: u.password , state: {state} , updatedAt: {updatedAt}, createdAt: {createdAt}})-[:USER]->(u) RETURN properties(r) AS reset , properties(u) AS user",
    params: this,
  },callback);
}

PassReset.reset = function(data,callback){
  db.cypher({
    query: "MATCH (r:Reset{id: {id},state: {state}})-[:USER]->(u:User) SET r.state = {newState} , u.password = {password} RETURN properties(r)",
    params: data,
  },callback);
}

module.exports = PassReset;
