const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create threads schema & model
const createThreadSchema = new Schema({
    categoryID: {
        type: ObjectId
    },
  departmentID: {
        type: ObjectId,
    },
    subject: {
        type: String
    },
    userName :{
        type: String,        
    },
    description: {
        type: String
    },
    document :{
        type: String
    },    
    email :{
        type: String
    },
    isToxic :{
        type: Boolean
    }
});


const Thread = mongoose.model('Threads',createThreadSchema);

module.exports = Thread;
