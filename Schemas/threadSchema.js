const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

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
  userId: String
});

module.exports = threadsSchema;
