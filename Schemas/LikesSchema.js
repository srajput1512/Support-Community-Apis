const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
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

module.exports = mongoose.model('like', likesSchema, 'Likes');

