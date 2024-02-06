const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router()
const Notes = require('../models/Notes');
const mongoose = require("mongoose");
const { body, validationResult } = require('express-validator');




// ROUTE 1: Get call the notes using: GET "/api/auth/getuser". Login Required 
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    const notes = await Notes.find({user: req.user.id});
    res.json(notes);

})

// ROUTE 2: Add a new notes using: POST "/api/auth/addnotes". Login Required 
router.get('/addnotes',fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'description must be at least 5 characters').isLength({ min: 5 }),
],async (req,res)=>{
    
    res.json(notes);
})
module.exports = router