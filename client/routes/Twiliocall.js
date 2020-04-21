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
const callControllers =require('../controllers/Twiliocall')




 router.post('/',callControllers.make_call);
 router.get('/:postId',callControllers.get_somepost);
 router.get('/',callControllers.get_allpost);

 router.delete('/:postId',checkAuth,callControllers.delete_post);

 router.patch('/:postId',checkAuth,callControllers.update_post)
module.exports = router;
