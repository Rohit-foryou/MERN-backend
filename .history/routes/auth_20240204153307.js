const express = require('express');

const router = express.Router();

// Create a User using: POST "/api/auth/". doesn't require authentication
router.get('/', (req,res)=>{

    console.log(req.body);
    
    res.send(req.body);

})

module.exports = router