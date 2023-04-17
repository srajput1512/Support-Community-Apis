const mongoose = require("mongoose");

var Schema = mongoose.Schema;
const departmentSchema = new Schema({
    departmentName: String,
});

module.exports = departmentSchema;
