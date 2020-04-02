var db = require('../Database/db');
var id = require('mongoose').Types.ObjectId;

var Message = function(data){
  this.id = new id();
  this.updatedAt = (new Date()).getTime();
  this.createdAt = (new Date()).getTime();

  this.message = data.message;
  this.sender = data.sender;
  this.receiver = data.receiver;
}

Message.prototype.create = function(callback){
  db.cypher({
    query: "MATCH (s:User{id: {sender}}),(r:User{id: {receiver}}) MERGE (s)<-[:SENDER]-(m:Message{id: {id}, message: {message}, updatedAt: {updatedAt}, createdAt: {createdAt}})-[:RECEIVER]->(r) RETURN r.id AS id , {name: s.name, friend: s.id} AS user, m.message AS message , 'personal' AS ntype",
    params: this,
  },callback);
}
Message.all = function(id,callback){
  db.cypher({
    //query: "MATCH (p:Profile)-[:USER]->(s)<-[:SENDER]-(m:Message)-[:RECEIVER]->(r:User{id: {user}}) RETURN  p.name , s.id, head(collect(m.message)), head(collect(m.createdAt)) AS time",
    query: "MATCH (u:User{id: {user}}) MATCH (u)<-[r]-(m:Message)-[r1]->(userr) RETURN userr.id AS friend , head(collect(properties(m))) AS message , userr.name AS name , userr.username AS username SKIP {skip} LIMIT 15",
    params: id,
  },callback)
}
Message.received = function(id,callback){
  db.cypher({
    query: "MATCH (m:Message{id: {id}})-[:RECEIVER]->(u:User{id: {user}}) SET m.read = timestamp()",
    params: id
  },callback)
}
Message.thread = function(id,callback){
  db.cypher({
    query: "MATCH (u:User{id: {me}})<-[r]-(m:Message)-[r1]->(user:User{id: {friend}}) MATCH (s)<-[:SENDER]-(m) RETURN properties(m) AS message , s.id AS sender ORDER BY m.createdAt DESC SKIP {skip} LIMIT 10",
    params: id,
  },callback)
}
module.exports = Message;
