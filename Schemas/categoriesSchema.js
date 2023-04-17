const mongoose = require("mongoose");

var Schema = mongoose.Schema;
const categorySchema = new Schema({
    CategoryName: String,
});

module.exports = categorySchema;
