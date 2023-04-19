const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

var Schema = mongoose.Schema;
const threadsSchema = new Schema({
  subject: String,
  categoryID: ObjectId,
  description: String,
  document: String,
  email: Boolean,
  departmentID: ObjectId,
  isToxic: Boolean
});

module.exports = threadsSchema;
