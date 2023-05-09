const mongoose = require('mongoose');

const responseLikesSchema = new mongoose.Schema({
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

module.exports = mongoose.model('responselike', responseLikesSchema, 'ResponseLikes');

