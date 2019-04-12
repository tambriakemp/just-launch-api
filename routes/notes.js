"use strict";

const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const jwtAuth = passport.authenticate("jwt", { session: false });

// IMPORT MODEL
const { Note } = require("../models/note");

const router = express.Router();

// GET ALL NOTES =========================================
router.get("/", (req, res) => {
  Note.find()
    .then(notes => {
      return res.json(notes.map(note => note.serialize()));
    })
    .catch(error => {
      return res.json(error);
    });
});

// GET ONE NOTE =========================================
router.get("/:id", jwtAuth, (req, res) => {
  Note.findById(req.params.id)
    .then(notes => {
      return res.json(notes.serialize());
    })
    .catch(error => {
      return res.json(error);
    });
});

// CREATE NEW NOTE ===================================
router.post("/", jwtAuth, (req, res) => {
  const newNote = {
    noteTitle: req.body.noteTitle,
    noteDescription: req.body.noteDescription,
    user: req.body.user
    //add date
  };

  Note.create(newNote)
    .then(createdNote => {
      return res.json(createdNote.serialize());
    })
    .catch(error => {
      console.error(error);
      return res.json({
        error: error.message
      });
    });
});

module.exports = { router };

//server
// app.use(
//   cors({
//     origin: CLIENT_ORIGIN
//   })
// );
// const { PORT, CLIENT_ORIGIN, DATABASE_NAME } = require('./config');

// //env
// CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:3000",
