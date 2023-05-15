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
});

module.exports = mongoose.model('responselike', responseLikesSchema, 'ResponseLikes');

