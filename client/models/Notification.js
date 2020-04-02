var bcrypt = require('bcrypt-nodejs');
var db = require('../Database/db');
var id = require('mongoose').Types.ObjectId;

var Comment = function(data){
  this.id = new id();
  this.post = data.post;
  this.question = data.question;
  this.user = data.user;
  this.comment = data.comment;
  this.updatedAt =  (new Date()).getTime();
  this.createdAt =  (new Date()).getTime();
}

Comment.prototype.create = function(callback){
  db.cypher({
    query: "MATCH (u:User{id: {user}}) , (p:Post{id: {post}}) WITH u,p MERGE (u)<-[:AUTHOR]-(c:Comment{id: {id}, comment: {comment}, updatedAt: {updatedAt}, createdAt: {createdAt}})-[:POST]->(p) RETURN u.name AS author , c.comment AS comment, c.createdAt AS createdAt ",
    params: this,
  },callback);
}

Comment.prototype.createReply = function(callback){
  db.cypher({
    query: "MATCH (u:User{id: {user}}) , (q:Question{id: {question}}) WITH u,q MERGE (u)<-[:AUTHOR]-(c:Comment{id: {id}, comment: {comment}, updatedAt: {updatedAt}, createdAt: {createdAt}})-[:QUESTION]->(q) RETURN u.name AS author , c.comment AS comment, c.createdAt AS createdAt ",
    params: this,
  },callback);
}

Comment.viewPostComments = function(data, callback){
  db.cypher({
    query: "MATCH (p:Post{id: {post}})<-[:POST]-(c:Comment)-[:AUTHOR]->(u) RETURN u.name AS author , c.comment AS comment, c.createdAt AS createdAt  ORDER BY c.createdAt  DESC skip {skip} LIMIT 10",
    params: data,
  },callback);
}

Comment.viewQuestionComments = function(data, callback){
  db.cypher({
    query: "MATCH (q:Question{id: {question}})<-[:QUESTION]-(c:Comment)-[:AUTHOR]->(u) RETURN u.name AS author , c.comment AS comment, c.createdAt AS createdAt ORDER BY c.createdAt  skip {skip} LIMIT 10",
    params: data,
  },callback);
}

Comment.delete = function(data, callback){
  db.cypher({
    query: "MATCH (u:User{id : {user}}) WITH u MATCH (c:Comment{id: {id}})-[:AUTHOR]->(u) DETACH DELETE c",
    params: data,
  },callback);
}

module.exports = Comment;
