var  neo4j = require('neo4j');
const mongoose =require('mongoose')
//var db = new neo4j.GraphDatabase("http://neo4j:kigali@localhost:7474");
var db = new neo4j.GraphDatabase("http://neo4j:Sr5pT2jJLg12@localhost:7474").then( () => console.log('DB Connected!'))
.catch(err => {
console.log("database fails ne");
});;

// mongoose.connect('mongodb+srv://telesphore:chance@onlinecourse-6te3t.mongodb.net/test?retryWrites=true&w=majority'
// ,{ useUnifiedTopology: true,
//     useNewUrlParser: true }
// ).then( () => console.log('DB Connected!'))
// .catch(err => {
// console.log("database fails");
// });

module.exports =db;