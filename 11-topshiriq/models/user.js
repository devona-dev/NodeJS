const mongoose = require('mongoose');

const User = mongoose.model("User", new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 15,
        required: true,
    },
    email: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 4,
        maxlength: 10,
        required: true,

    }
}));

exports.User = User;