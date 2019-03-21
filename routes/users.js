"use strict";
const express = require("express");
const mongoose = require("mongoose");
const Joi = require("joi");

// IMPORT MODEL
const { User, UserJoiSchema } = require("../models/user");

const router = express.Router();

// GET ALL USERS =========================================
router.get("/", (req, res) => {
  User.find()
    .then(users => {
      return res.json(users.map(user => user.serialize()));
    })
    .catch(error => {
      return res.json(error);
    });
});

// GET ONE USERS =========================================
router.get("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(users => {
      return res.json(users.serialize());
    })
    .catch(error => {
      return res.json(error);
    });
});

// CREATE USER =========================================
router.post("/", (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };

  const validation = Joi.validate(newUser, UserJoiSchema);
  if (validation.error) {
    return res.json({ error: validation.error });
  }
  User.findOne({
    $or: [{ email: newUser.email }, { username: newUser.username }]
  })
    .then(user => {
      if (user) {
        return res.json({
          error: "Error: A user with that username and/or email already exists."
        });
      }
      return User.hashPassword(newUser.password);
    })
    .then(passwordHash => {
      newUser.password = passwordHash;
      User.create(newUser)
        .then(createdUser => {
          return res.json(createdUser.serialize());
        })
        .catch(error => {
          console.error(error);
          return res.json({
            error: error.message
          });
        });
    });
});

module.exports = { router };
