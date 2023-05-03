const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    CategoryName: {
        type: String
    }
});

module.exports = mongoose.model('Categories', categorySchema, 'Category');

