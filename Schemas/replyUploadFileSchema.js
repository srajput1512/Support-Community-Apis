const mongoose = require('mongoose');

const fileUploadReplySchema = new mongoose.Schema({
    replyThreadId: { type: mongoose.Schema.Types.ObjectId },
    fileContents: { type: String },
    fileName: { type: String },
    fileTitle: { type: String }
});

module.exports = mongoose.model('fileUploadReply', fileUploadReplySchema, 'FileUploadReply');

