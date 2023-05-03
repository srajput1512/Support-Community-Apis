const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    userEmail: {
        type: String
    },
    userName: {
        type: String
    },
    userMsisdn: {
        type: Number
    },
});

module.exports = mongoose.model('user', userSchema, 'User');

