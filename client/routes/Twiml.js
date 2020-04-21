const express = require('express');
const router = express.Router();


const multer = require('multer');
const checkAuth= require('../midleware/check-auth')
const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './uploads');
    },
    filename:function(req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g, '-')+file.originalname);
    }

})
const upload =multer({storage:storage});
const callControllers =require('../controllers/Twiml')




 router.get('/',callControllers.make_ml);

module.exports = router;
