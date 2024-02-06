const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "Rohitisagoodboy";

// Create a User using: POST "/api/auth/createUser". doesn't require authentication
router.post('/createUser', [
    body('name', 'Enter a valid Name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    //IF THERE ARE ERRORS THEN RETURN BAD REQUEST AND THE ERROR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        //check whether the user with this email exist already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exist" })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //Create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        })

        const data = {
            user:{
                id: user.id
            }
        }
        
        const authtoken = jwt.sign(data, JWT_SECRET);
        

        // res.json(user);
        res.json({authtoken});

        //catch error in code
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})

// Authenticate a User using: POST "/api/auth/login".
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {

    //IF THERE ARE ERRORS THEN RETURN BAD REQUEST AND THE ERROR
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {email, password} = req.body;
    try {
        let user = User.findOne({email});
        if(!user){
            return res.status(400).json({error: "please login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if(!passwordCompare){
            return res.status(400).json({error: "please login with correct credentials"});

        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken});
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router