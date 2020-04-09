
const express = require('express');
const router = express.Router();

const checkAuth= require('../midleware/check-auth')
const UserControllers =require('../controllers/Users')
 router.post('/signup',UserControllers.create_user);

//  login ahanganaha 

router.post('/login',UserControllers.user_login)



// ======================================================GET all users================
 router.get('/',checkAuth,UserControllers.get_allusers);

 router.delete('/:userid',checkAuth,UserControllers.delete_user);

 router.patch('/update',checkAuth,UserControllers.update_user)
 router.patch('/verification',UserControllers.user_verification)
module.exports = router;
