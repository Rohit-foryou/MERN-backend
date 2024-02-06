const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a User using: POST "/api/auth/". doesn't require authentication
router.post('/', [

    body('name', 'Enter a valid Name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password','Password must be at least 5 characters').isLength({ min: 5 }),
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
    }).then(user=> res.json(user));
  
})

module.exports = router