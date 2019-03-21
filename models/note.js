"use strict";

const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const NoteSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  noteTitle: {
    type: String,
    required: true
  },
  noteDescription: {
    type: String,
    required: true
  }
});

NoteSchema.methods.serialize = function() {
  let user;
  // We serialize the user if it's populated to avoid returning any sensitive information, like the password hash.
  if (typeof this.user.serialize === "function") {
    user = this.user.serialize();
  } else {
    user = this.user;
  }
  return {
    id: this._id,
    user: user, //comes back as an object
    noteTitle: this.noteTitle,
    noteDescription: this.noteDescription
  };
};

const Note = mongoose.model("Note", NoteSchema);

module.exports = { Note };
