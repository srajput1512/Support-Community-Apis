const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const postThreadSchema = new mongoose.Schema({
    subject: {
        type: String
    },
    categoryID: {
        type: String
    },
    document: {
        type: String
    },
    departmentID: {
        type: String
    },
    isToxic: {
        type: Boolean
    },
    postedDateTime: {
        type: String
    },
    userId: {
        type: String
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('threads', postThreadSchema, 'Thread');


