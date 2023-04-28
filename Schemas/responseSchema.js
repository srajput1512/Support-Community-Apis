const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

var Schema = mongoose.Schema;
const responsesSchema = new Schema({
  parentThreadId: { type: mongoose.Schema.Types.ObjectId, ref: 'threadList' },
  replyHelpful: Boolean,
  userId: String,
  postedDateTime: String,
  description: String,
  document: String,
  isToxic: Boolean,
});

module.exports = responsesSchema;
