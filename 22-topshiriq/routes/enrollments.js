const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { Courser } = require('../models/courser');
const { Customer } = require('../models/customer');
const { Enrollment } = require('../models/enrollment');
const auth = require('../middleware/auth');



router.get('/', async (req, res) => {
    const enrollments = await Enrollment.find().sort('-dateStart');
    res.send(enrollments);
});

router.post('/', auth , async (req, res) => {
    const schema = Joi.object({
        customerId: Joi.string().required(),
        courseId: Joi.string().required()
    })

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const course = await Courser.findById(req.body.courseId);
    if(!course)
        res.status(404).send('Bunaqa ID mavjud emas..')

    const customer = await Customer.findById(req.body.customerId);
    if(!customer)
        res.status(404).send('Bunaqa ID mavjud emas..');

    let enrollment = new Enrollment ({
        customer: {
            _id: customer._id,
            name: customer.name
        },
        course: {
            _id: course._id,
            title: course.title
        },
        courseFee: course.fee,
    });
    if(customer.isVip)
        enrollment.courseFee = course.fee - (0.2 * course.fee);

    enrollment = await enrollment.save();

    customer.bonusPoints++;
    customer.save();
    
    res.status(201).send(enrollment);
});

router.get('/:id', auth , async (req, res) => {

    const enrollment = await Enrollment.findById(req.params.id);
    if (!enrollment)
        return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');

    res.send(enrollment);
});


module.exports = router;