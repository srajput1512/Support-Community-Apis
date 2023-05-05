const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    parentThreadId: {
        type: String
    },
    isLiked: {
        type: Boolean
    },
});

module.exports = mongoose.model('like', likesSchema, 'Likes');

