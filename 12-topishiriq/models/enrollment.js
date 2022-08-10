const mongoose = require('mongoose');
const { customerSchema } = require('./customer')
const { courserSchema } = require('./courser')

const Enrollment = mongoose.model('Enrollment', new mongoose.Schema({
    customer:{
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 55
            }
        }),
        required: true
    },
    course: {
        type: new mongoose.Schema({
            title: {
                type: String,
                required: true,
                trim: true,
                minlength: 5,
                maxlength: 255
            }
        }),
        required: true
    },
    dateStart: {
        type: Date,
        required: true,
        default: Date.now
    },
    courseFee: {
        type: Number,
        min: 0
    }
}))

exports.Enrollment = Enrollment
