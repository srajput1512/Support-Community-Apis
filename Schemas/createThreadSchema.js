const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create threads schema & model
const createThreadSchema = new Schema({
    categoryID: {
        type: ObjectId,
        required: [true, 'ID field is required']
    },
  departmentID: {
        type: ObjectId,
        required: [true, 'ID field is required']
    },
    subject: {
        type: String,
    },
    userName :{
        type: String,
        
    },
    description: {
        type: String,
        deafult: true
    },
    document :{
        type: String,
        
    },
   
    
    email :{
        type: String,
        
    },
    isToxic :{
        type: Boolean,
        deafult: true
    }
});


const Thread = mongoose.model('Threads',createThreadSchema);

module.exports = Thread;
