"use strict";

const express = require("express");
const mongoose = require("mongoose");

// IMPORT MODEL
const { Business } = require("../models/business");

const router = express.Router();

// GET ALL USERS =========================================
router.get("/", (req, res) => {
  Business.find()
    .then(businesses => {
      return res.json(businesses.map(business => business.serialize()));
    })
    .catch(error => {
      return res.json(error);
    });
});

// GET ONE USERS =========================================
router.get("/:id", (req, res) => {
  Business.findById(req.params.id)
    .then(businesses => {
      return res.json(businesses.serialize());
    })
    .catch(error => {
      return res.json(error);
    });
});

// CREATE NEW BUSINESS ===================================
router.post("/", (req, res) => {
  const newBusiness = {
    task: req.body.task,
    imgURL: req.body.imgURL,
    description: req.body.description,
    videoID: req.body.videoID
  };

  Business.create(newBusiness)
    .then(createdBusiness => {
      return res.json(createdBusiness.serialize());
    })
    .catch(error => {
      console.error(error);
      return res.json({
        error: error.message
      });
    });
});

module.exports = { router };
