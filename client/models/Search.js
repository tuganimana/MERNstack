var db = require('../Database/db');
var id = require('mongoose').Types.ObjectId;

var Search = function(data){
  this.id = new id();
  this.query = data.query;
  this.skip = data.skip;
  this.squery = data.squery;
  this.updatedAt =  (new Date()).getTime();
  this.createdAt =  (new Date()).getTime();
}

Search.prototype.create = function(callback){
  db.cypher({
    query: "CREATE (s:Search{id: {id}, query: {query}, updatedAt: {updatedAt}, createdAt: {createdAt}}) WITH s MATCH (t)<-[:TOPIC]-(p:Post)-[:AUTHOR]->(a) WHERE p.title =~ {squery} OR t.topic =~ {squery} OR a.name  =~ {squery}  with p,t,a OPTIONAL MATCH (c:Comment)-[:POST]->(p) WITH count(c) AS comments , t,p,a RETURN p.id AS id , p.media AS media , p.title AS title , p.name AS name , p.content AS content , p.createdAt AS createdAt , t.topic AS topic , {name: a.name , photo: a.photo , id: a.id , type: labels(a)[0]} AS author , comments AS comments ORDER BY p.createdAt DESC SKIP {skip} LIMIT 12",
    params: this,
  },callback);
}

Search.suggest = function(data, callback){
  db.cypher({
    query: "MATCH (s:Search) WHERE s.query CONTAINS {query} RETURN DISTINCT s.query  AS query LIMIT 5",
    params: data,
  },callback);
}


module.exports = Search;
