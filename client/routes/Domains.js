const express = require('express');
const router = express.Router();

const Domains = require('../models/Domains')
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
const DomainControllers =require('../controllers/Domains')




 router.post('/',checkAuth,upload.single('pictures'),DomainControllers.create_post);
 router.get('/:postId',DomainControllers.get_somepost);
 router.get('/',DomainControllers.get_allpost);

 router.delete('/:postId',checkAuth,DomainControllers.delete_post);

 router.patch('/:postId',checkAuth,DomainControllers.update_post)
module.exports = router;