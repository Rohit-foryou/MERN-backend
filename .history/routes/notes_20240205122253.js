const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router()
const Notes = require('../models/Notes');
const mongoose = require("mongoose");



// ROUTE 1: Get call the notes using: GET "/api/auth/getuser". Login Required 

router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    const notes = await Notes.find({user: req.user.id});
    res.json(notes);

})

module.exports = router