var db = require('../Database/db');

var Info = {
  all: function(data, callback){
    db.cypher({
      query: "MATCH (a:Post{type: {article}}) WITH count(a) AS articles MATCH (p:Post{type: {post}}) WITH count(p) AS posts , articles MATCH (u:User) WITH count(u) AS users , posts , articles RETURN articles AS articles , posts AS posts , users AS users ",
      params: data,
    },callback);
  }
}

module.exports = Info;
