const express = require('express');
const router = express.Router();

const Post = require('../models/Post');
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
const PostControllers =require('../controllers/Post')




 router.post('/',checkAuth,upload.single('pictures'),PostControllers.create_post);
 router.get('/:postId',PostControllers.get_somepost);
 router.get('/',PostControllers.get_allpost);

 router.delete('/:postId',checkAuth,PostControllers.delete_post);

 router.patch('/:postId',checkAuth,PostControllers.update_post)
module.exports = router;
