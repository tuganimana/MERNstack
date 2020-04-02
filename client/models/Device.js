var db = require('../Database/db');
var id = require('mongoose').Types.ObjectId;

var Device = function(data){
 this.id = new id();
 this.updatedAt = (new Date()).getTime();
 this.createdAt = (new Date()).getTime();

 this.environment = data.environment;
 this.user = data.user;
 this.token = data.token;

}

Device.prototype.create = function(callback){
  db.cypher({
    query: "MATCH (u:User{id: {user}}) MERGE (u)-[:DEVICE]->(d:Device{id: {id},environment: {environment},token: {token}})",
    params: this,
  },callback)
}
Device.update = function(data,callback){
  db.cypher({
    query: "MATCH (u:User{id: {user}})-[:DEVICE]->(d:Device{token: {before}}) SET d.token = {token}",
    params: data,
  },callback)
}


module.exports = Device;
