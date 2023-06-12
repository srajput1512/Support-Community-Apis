const mongoose = require('mongoose');

const fileUploadSchema = new mongoose.Schema({
    threadId: { type: mongoose.Schema.Types.ObjectId },
    fileContents: { type: String },
    fileName: { type: String },
    fileTitle: { type: String }
});

module.exports = mongoose.model('fileUpload', fileUploadSchema, 'FileUpload');

