const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const postThreadReplySchema = new mongoose.Schema({
  parentThreadId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'threads'
  },
  replyHelpful: {
    type: Boolean
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
  },
  isAllowed:{
    type:Boolean
}
}, { strict: true });

module.exports = mongoose.model('replies', postThreadReplySchema, 'Reply');

