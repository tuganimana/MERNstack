
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const router = require('./router');
const port =process.env.PORT || 5000
const app = express();
const morgan = require('morgan');
const bodyParser =require('body-parser')
const mongoose =require('mongoose')
const twilio = require('twilio');
// const dbconnect = require('./db.js')
// connection to mongo mu

 mongoose.connect('mongodb+srv://chance:chance@elearning-dmbnj.mongodb.net/test?retryWrites=true&w=majority'
,{ useUnifiedTopology: true,
    useNewUrlParser: true }
 ).then( () => console.log('DB Connected!'))
.catch(err => {
console.log(err);
});

mongoose.Promise =global.Promise;
// const io = socketio(server);
const postRoutes =require('./client/routes/Post');

const userRoutes = require('./client/routes/User');
const domainsRoutes= require('./client/routes/Domains');
const callRoutes =require('./client/routes/Twiliocall');
const twmlRoutes =require('./client/routes/Twiml')

// bishyire kuri incoming
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({
    extended:false
}))
app.use(bodyParser.json());
// kwemera ama headers
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers','Orgin,X-Requested-With,Content-Type,Accept,Authorization');
    if (req.method ==='OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,post,patch,GET,DELETE,PATCH');
        return res.status(200).json({})
    };
    next();
});



// shyira ama routes yawe hano 
app.use('/api/post',postRoutes);

app.use('/user',userRoutes);
app.use('/api/domains',domainsRoutes);
app.use('/api/twillio',callRoutes);
app.use('/api/twiml',twmlRoutes);
app.use(express.static('uploads'))
// error igihe ntakintu kibaye 

app.use((req,res,next)=>{
    const error = new Error('Not found');
     error.status(404);
     next(error)
})
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{ 
            message:error.message
        }
    })
})
module.exports = app;