const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

var Schema = mongoose.Schema;
const responsesSchema = new Schema({
  parentThreadId: ObjectId,
  replyHelpful : Boolean,
  userName : String,
  datePosted:String,
  description: String, 
  attachment: String,
  isToxic:Boolean
});

module.exports = responsesSchema;
