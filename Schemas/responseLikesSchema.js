const mongoose = require('mongoose');

const responseLikesSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    parentThreadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'threads'
    },
    isLiked: {
        type: Boolean
    },
    replyId: {
        type: mongoose.Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('responselike', responseLikesSchema, 'ResponseLikes');

