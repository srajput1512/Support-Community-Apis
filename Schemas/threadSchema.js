const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Reply = require("./responseSchema");

var Schema = mongoose.Schema;
const threadsSchema = new Schema({
  subject: String,
  categoryID: String,
  description: String,
  document: String,
  email: Boolean,
  departmentID: String,
  isToxic: Boolean,
  postedDateTime: String,
  userId: String,
  Reply: Array
});

module.exports = threadsSchema;
