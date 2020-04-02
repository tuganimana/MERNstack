var express = require('express');
var router = express.Router();

var Functions = require('../functions/Device');

router.post('/save',Functions.save);
router.post('/update',Functions.update);

module.exports = router;
