const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    isVip: {
        type: String,
        default: false
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlenght: 50
    }
})

const Customer = mongoose.model('Customer', customerSchema);

exports.Customer = Customer; 
