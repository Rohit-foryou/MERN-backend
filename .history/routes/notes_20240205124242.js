const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router()
const Note = require('../models/Note');
const mongoose = require("mongoose");
const { body, validationResult } = require('express-validator');




// ROUTE 1: Get call the notes using: GET "/api/auth/getuser". Login Required 
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})

// ROUTE 2: Add a new notes using: POST "/api/auth/addnotes". Login Required 
router.get('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'description must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        //IF THERE ARE ERRORS THEN RETURN BAD REQUEST AND THE ERROR
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })

        const saveNote = await note.save();

        res.json(saveNote);


    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
})
module.exports = router