const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create response schema & model
const createThreadResponseSchema = new Schema({
  parentThreadId: {
    type: ObjectId,
  },
  replyHelpful: {
    type: Boolean,
  },
  userName: {
    type: String,
  },
  datePosted: {
    type: String,
  },

  description: {
    type: String,
    deafult: true,
  },

  attachment: {
    type: String,
  },

  isToxic: {
    type: Boolean,
    deafult: true,
  },
});

const Response = mongoose.model("Response", createThreadResponseSchema);

module.exports = Response;
