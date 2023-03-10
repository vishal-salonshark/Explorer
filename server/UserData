const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userData = new Schema({
    email: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('UserData', userData);