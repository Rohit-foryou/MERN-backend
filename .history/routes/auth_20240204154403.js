const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Create a User using: POST "/api/auth/". doesn't require authentication
router.get('/', (req,res)=>{

    console.log(req.body);
    const user = new User(req.body);
    user.save();
    
    res.send(req.body);

})

module.exports = router