const mongoose = require('mongoose');

const dashboardSchema = new mongoose.Schema({
    CategoryName: {
        type: String
    }
});

module.exports = mongoose.model('Categories', dashboardSchema, 'Category');

