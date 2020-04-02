var bcrypt = require('bcrypt-nodejs');
var db = require('../Database/db');
var id = require('mongoose').Types.ObjectId;

var Question = function(data){
  this.id = new id();
  this.user = data.user;
  this.question = data.question;
  this.room = data.room;
  this.updatedAt =  (new Date()).getTime();
  this.createdAt =  (new Date()).getTime();
}

Question.prototype.create = function(callback){
  db.cypher({
    query: "MATCH (u:User{id: {user}}) WITH u MATCH (r:Room) WHERE r.id = {room} or r.name = {room} WITH u,r MERGE (u)<-[:AUTHOR]-(q:Question{id: {id}, question: {question}, createdAt: {createdAt} , updatedAt: {updatedAt}})-[:ROOM]->(r) RETURN u.name AS author , r.name AS room , q.id AS id , q.question AS question , q.createdAt AS createdAt , 0 AS  replies , 'room' AS ntype , u.id AS exclude",
    params: this,
  },callback);
}

Question.viewRoom = function(data, callback){
  db.cypher({
    query: "MATCH (u:User{id: {user}})-[:MEMBER]->(r:Room) WHERE r.id = {room} or r.name = {room} WITH r MATCH (a)<-[:AUTHOR]-(q:Question)-[:ROOM]->(r) WITH q,r,a OPTIONAL MATCH (q)<-[:QUESTION]-(c:Comment) RETURN a.name AS author , a.id AS authorId , r.name AS room , q.id AS id , q.question AS question , q.createdAt AS createdAt, count(c) AS replies ORDER BY q.createdAt DESC skip {skip} LIMIT 10",
    params: data,
  },callback);
}

Question.viewRecent = function(data, callback){
  db.cypher({
    query: "MATCH (u:User{id: {user}})-[:MEMBER]->(r:Room) MATCH (q:Question)-[:ROOM]->(r) RETURN q ORDER BY q.createdAt skip {skip} LIMIT 5",
    params: data,
  },callback);
}

Question.delete = function(data, callback){
  db.cypher({
    query: "MATCH (u:User{id : {user}}) WITH u MATCH (q:Question{id: {id}})-[:AUTHOR]->(u) WITH u,q OPTIONAL MATCH (c:Comment)-[:QUESTION]->(q) DETACH DELETE c , q",
    params: data,
  },callback)
}


module.exports = Question;
