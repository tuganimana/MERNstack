var bcrypt = require('bcrypt-nodejs');
var db = require('../Database/db');
var id = require('mongoose').Types.ObjectId;

var Room = function(data){
  this.id = new id();
  this.user = data.user;
  this.name = data.name;
  this.topic = data.topic;
  this.age = data.age;
  this.updatedAt =  (new Date()).getTime();
  this.createdAt =  (new Date()).getTime();
}

Room.prototype.create = function(callback){
  db.cypher({
    query: "MATCH (u:User{id: {user}, admin: true}) , (t:Topic{id: {topic}}) WITH u , t MERGE (r:Room{id: {id}, name: {name}, age: {age}, updatedAt: {updatedAt}, createdAt: {createdAt}})-[:TOPIC]->(t) RETURN r.id AS id , r.name AS name , r.age AS age",
    params: this,
  },callback);
}

Room.viewAll = function(data, callback){
  db.cypher({
    query: "MATCH (u:User{id: {user}, admin: true}) WITH u MATCH (r:Room) RETURN r.id AS id , r.name AS name , r.age AS age LIMIT {size}",
    params: data,
  },callback);
}

Room.delete = function(data, callback){
  db.cypher({
    query: "MATCH (u:User{id: {user}, admin: true}) WITH u MATCH (r:Room{id: {id}}) WITH r OPTIONAL MATCH (c:Comment)-[:QUESTION]->(q:Question)-[:ROOM]->(r) WITH r,q,c DETACH DELETE r,q,c",
    params: data,
  },callback);
}

Room.join = function(data, callback){
  db.cypher({
    query: "MATCH (u:User{id: {user}}) WITH  u , ({year} - u.birthday) AS age MATCH (r:Room{id: {room}}) WHERE r.age = 0 OR r.age = CASE WHEN age < 19 THEN 2 ELSE 1 END MERGE (u)-[:MEMBER]->(r) RETURN true AS created",
    params: data,
  },callback);
}

Room.suggest = function(data,callback){
  db.cypher({
    query: "MATCH (u:User{id: {user}}) WITH u , ({year} - u.birthday) AS age MATCH (r:Room)-[:TOPIC]->(t) WHERE r.age = 0 OR r.age = CASE WHEN age <  19 THEN 2 ELSE 1 END OPTIONAL MATCH (q:Question)-[:ROOM]->(r) WITH collect(q.question)[0..2] AS qs, r, t , u OPTIONAL MATCH (m)-[:MEMBER]->(r) WITH count(m) AS members , qs, r, t , u  OPTIONAL MATCH (u)-[me:MEMBER]->(r)  RETURN r.name AS name , r.id AS id , t.topic AS topic , members AS members , qs AS questions ,NOT me IS NULL AS joined",
    params: data,
  },callback);
}

Room.suggestNo = function(callback){
  db.cypher({
    query: "MATCH (r:Room)-[:TOPIC]->(t) OPTIONAL MATCH (q:Question)-[:ROOM]->(r) WITH collect(q.question)[0..2] AS qs, r, t  OPTIONAL MATCH (m)-[:MEMBER]->(r) WITH count(m) AS members , qs, r, t  RETURN r.name AS name , r.id AS id , t.topic AS topic , members AS members , qs AS questions ,false AS joined",
    params: {},
  },callback);
}

Room.mine = function(data,callback){
  db.cypher({
    query: "MATCH (t)<-[:TOPIC]-(r:Room)<-[:MEMBER]-(u:User{id: {user}}) RETURN r.name AS room , r.id AS id , t.topic AS topic",
    params: data,
  },callback);
}

module.exports = Room;
