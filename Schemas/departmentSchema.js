const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    CategoryName: {
        type: String
    }
});

module.exports = mongoose.model('Departments', departmentSchema, 'Department');

