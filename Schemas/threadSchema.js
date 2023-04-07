const mongoose = require('mongoose');

var Schema = mongoose.Schema; 
const threadsSchema = new Schema({
            Subject: String,
            CategoryID : String,
            Description: String,
            Document: String,
            Email : String,
            UserID: String,
            UserName: String
})

module.exports = threadsSchema;