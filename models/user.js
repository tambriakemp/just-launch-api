const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Joi = require("joi");

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
});

UserSchema.methods.serialize = function() {
  return {
    id: this._id,
    username: this.username || "",
    name: this.name || "",
    email: this.email || ""
  };
};

const UserJoiSchema = Joi.object().keys({
  name: Joi.string()
    .min(1)
    .trim()
    .required(),
  username: Joi.string()
    .alphanum()
    .min(4)
    .max(30)
    .trim()
    .required(),
  password: Joi.string()
    .min(8)
    .max(30)
    .trim()
    .required(),

  email: Joi.string()
    .email()
    .trim()
    .required()
});

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model("User", UserSchema);

module.exports = { User, UserJoiSchema };
