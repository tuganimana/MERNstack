var bcrypt = require('bcrypt-nodejs');
var db = require('../Database/db');
var id = require('mongoose').Types.ObjectId;

var Topic = function(data){
  this.id = new id();
  this.topic = data.topic;
  this.updatedAt =  (new Date()).getTime();
  this.createdAt =  (new Date()).getTime();
}

Topic.prototype.create = function(callback){
  db.cypher({
    query: "CREATE (t:Topic{id: {id}, topic: {topic} , updatedAt: {updatedAt}, createdAt: {createdAt}})",
    params: this,
  },callback);
}

Topic.all = function(callback){
  db.cypher({
    query: "MATCH (t:Topic) RETURN t.id AS id  , t.topic AS topic",
    params: {},
  },callback);
}

Topic.posts = function(callback){
  db.cypher({
    query: "OPTIONAL MATCH (t:Topic)<-[:TOPIC]-(p:Post) RETURN t.id AS id  , t.topic AS topic , count(p) AS posts ORDER by posts DESC",
    params: {},
  },callback);
}

Topic.remove = function(data, callback){
  db.cypher({
    query: "MATCH (t:Topic{id: {id}}) DETACH DELETE t",
    params: data,
  },callback);
}

Topic.interest = function(data, callback){
  db.cypher({
    query: "MATCH (u:User{id: {user}}) , (t:Topic{id: {topic}}) WITH u , t MERGE (u)-[:INTERESTED]->(t)",
    params: data,
  },callback);
}

Topic.suggest = function(data, callback){
  db.cypher({
    query: "MATCH (u:User{id: {user}}) WITH u MATCH (t:Topic) WHERE NOT (u)-[:INTERESTED]->(t) RETURN t.id AS id , t.topic AS topic , false AS interested LIMIT 5",
    params: data,
  },callback);
}

module.exports = Topic;
