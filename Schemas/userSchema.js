const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

var Schema = mongoose.Schema;
const userSchema = new Schema({
    userId: String,
    userEmail: String,
    userName: String,
    userMsisdn: Number
});

module.exports = userSchema;
