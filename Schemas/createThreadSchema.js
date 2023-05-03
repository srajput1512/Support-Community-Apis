
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const createThreadSchema = new mongoose.Schema({
    
    subject: {
        type: String
    },
    categoryID: {
        type: ObjectId
    },
    document: {
        type: String
    },
    departmentID: {
        type: ObjectId
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
}, { strict: true });

module.exports = mongoose.model('threads', createThreadSchema,'Thread');


