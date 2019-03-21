const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const BusinessSchema = mongoose.Schema({
  task: {
    taskName: String,
    taskDescription: String
  }, //this needs to be an object
  imgURL: { type: String },
  description: { type: String },
  videoID: { type: String }
});

BusinessSchema.methods.serialize = function() {
  return {
    id: this._id,
    task: this.task || "",
    imgURL: this.imgURL || "",
    description: this.description || "",
    videoID: this.videoID || ""
  };
};

const Business = mongoose.model("Business", BusinessSchema);

module.exports = { Business };
