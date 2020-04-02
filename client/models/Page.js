var bcrypt = require('bcrypt-nodejs');
var db = require('../Database/db');
var id = require('mongoose').Types.ObjectId;

var Page = function(data){
  this.id = new id();
  this.user = data.user;
  this.phone = data.phone;
  this.photo = data.photo;
  this.name = data.name;
  this.description = data.description;
  this.expertise = data.expertise;
  this.address = data.address ? data.address : '';
  this.type = data.type;
  this.email = data.email ? data.email : '';
  this.clinic = data.clinic ? data.clinic : '';
  this.doc_type = data.doc_type ? data.doc_type : '';
  this.specialities = data.specialities ? data.specialities : '';
  this.verified = false;
  this.updatedAt =  (new Date()).getTime();
  this.createdAt =  (new Date()).getTime();
}

Page.prototype.create = function(callback){
  db.cypher({
    query: "MATCH (u:User{id: {user}}) , (t:Topic{id: {expertise}}) WITH u , t MERGE (u)<-[:USER]-(p:Page{id: {id}, phone: {phone}, address: {address}, name: {name}, photo: {photo}, type: {type}, description: {description}, verified: {verified}, updatedAt: {updatedAt}, createdAt: {createdAt}, email: {email}, clinic: {clinic}, doc_type: {doc_type}, specialities: {specialities}})-[:TOPIC]->(t) RETURN p.id AS id",
    params: this,
  },callback);
}

Page.viewUnverified = function(data, callback){
  db.cypher({
    query: `MATCH (u:User{id: {user}, admin: true})
      WITH u MATCH (p:Page{verified: false})-[:TOPIC]->(t)
      RETURN p.id AS id , p.name AS name , p.photo AS photo , p.type AS type , t.topic AS topic , p.phone AS phone , p.address AS address , p.email AS email , p.clinic AS clinic , p.doc_type AS doc_type , p.specialities AS specialities , p.description AS description , false AS verified SKIP {skip} LIMIT 5`,
    params: data,
  },callback);
}

Page.recomend = function(data, callback){
  db.cypher({
    query: `MATCH (p:Page{verified: true})-[:TOPIC]->(t)
      RETURN p.id AS id , p.name AS name , p.photo AS photo , p.type AS type , t.topic AS topic , p.phone AS phone , p.address AS address , p.email AS email , p.clinic AS clinic , p.doc_type AS doc_type , p.specialities AS specialities , p.description AS description , true AS verified ORDER BY p.createdAt DESC SKIP {skip} LIMIT 3`,
    params: data,
  },callback);
}

Page.all = function(data, callback){
  db.cypher({
    query: `MATCH (p:Page{verified: true})-[:TOPIC]->(t)
      RETURN p.id AS id , p.name AS name , p.photo AS photo , p.type AS type , t.topic AS topic , p.phone AS phone , p.address AS address , p.email AS email , p.clinic AS clinic , p.doc_type AS doc_type , p.specialities AS specialities , p.description AS description , true AS verified ORDER BY p.createdAt DESC SKIP {skip} LIMIT 10`,
    params: data,
  },callback);
}

Page.type = function(data, callback){
  db.cypher({
    query: `MATCH (p:Page{verified: true})-[:TOPIC]->(t) WHERE p.type = {type}
      RETURN p.id AS id , p.name AS name , p.photo AS photo , p.type AS type , t.topic AS topic , p.phone AS phone , p.address AS address , p.email AS email , p.clinic AS clinic , p.doc_type AS doc_type , p.specialities AS specialities , p.description AS description , true AS verified ORDER BY p.createdAt DESC SKIP {skip} LIMIT 10`,
    params: data,
  },callback);
}


Page.view = function(data, callback){
  db.cypher({
    query: `MATCH (p:Page)-[:TOPIC]->(t) WHERE p.id = {id} or p.name = {id} WITH p,t OPTIONAL MATCH (post)-[:AUTHOR]->(p) WITH p, t, count(post) AS posts OPTIONAL MATCH (u:User)<-[:USER]-(p) WITH u , posts , p , t
      RETURN p.id AS id , p.name AS name , p.photo AS photo , p.type AS type , t.topic AS topic , p.phone AS phone , p.address AS address , p.email AS email , p.clinic AS clinic , p.doc_type AS doc_type , p.specialities AS specialities , p.description AS description , p.verified AS verified , posts AS posts , u.id AS account , u.id = {user} AS owner`,
    params: data,
  },callback);
}

Page.verify = function(data, callback){
  db.cypher({
    query: "MATCH (u:User{id: {user}, admin: true}) WITH u MATCH (p:Page{id: {page}, verified: false}) SET p.verified = true",
    params: data,
  },callback)
}

Page.delete = function(data, callback){
  db.cypher({
    query: "MATCH (u:User{id: {user}, admin: true}) WITH u MATCH (p:Page{id: {page}}) WITH p OPTIONAL MATCH (post:Post)-[:AUTHOR]->(p) DETACH DELETE p,post",
    params: data,
  },callback)
}

Page.unverify = function(data, callback){
  db.cypher({
    query: "MATCH (u:User{id: {user}, admin: true}) WITH u MATCH (p:Page{id: {page}, verified: true}) SET p.verified = false",
    params: data,
  },callback)
}

module.exports = Page;
