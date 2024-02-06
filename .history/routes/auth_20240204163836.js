const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a User using: POST "/api/auth/". doesn't require authentication
router.post('/createUser', [

    body('name', 'Enter a valid Name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password','Password must be at least 5 characters').isLength({ min: 5 }),
], async(req, res) => {

    //IF THERE ARE ERRORS THEN RETURN BAD REQUEST AND THE ERROR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    //check whether the user with this email exist already
    let user = User.findOne({email: req.body.email});
    if(user){
        return res.status(400).json({error: "Sorry a user with this email already exist"})
    }
    user = await User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    })
    
    // .then(user=> res.json(user))
    // .catch(err=>{
    //     console.log(err)
    //     res.json({error: 'Please enter a unique email'})
    })
  
})

module.exports = router