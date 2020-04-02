const express = require('express');
const router = express.Router();

router.get('/', (req,res)=>{
    // twohereze message ko ikunda
    res.send('server irigukor')
})

// let export our router
module.exports = router;
