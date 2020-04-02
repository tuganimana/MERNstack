var express = require('express');
var router = express.Router();

var Functions = require('../../functions/messages');

router.post('/send', Functions.send);
router.get('/all/:skip' , Functions.read);
router.post('/received', Functions.received);
router.get('/thread/:friend/:skip?', Functions.thread);

module.exports = router;
