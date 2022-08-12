const mongoose = require('mongoose');
const { categorySchema } = require('./category')


const courserSchema = new mongoose.Schema({
    tags: {
        type: [String]
    },
    title:{
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },
    category: {
        type: categorySchema,
        required: true
    },
    trainer: {
        type: String,
        required: true,

    },
    status: {
        type: String,
        required: true,
        enum: ['Active', 'Inactive']
    },
    fee: {
        type: Number,
        required: true
    }
})

const Courser = mongoose.model('Courser', courserSchema);

exports.Courser = Courser; 
exports.courserSchema = courserSchema;
