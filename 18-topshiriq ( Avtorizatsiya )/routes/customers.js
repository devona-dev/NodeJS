const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { Customer } = require('../models/customer');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', auth , async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        isVip: Joi.boolean().required() ,
        phone: Joi.string().min(5).max(50).required() 
   })

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let customer = new Customer ({
        name: req.body.name,
        isVip: req.body.isVip,
        phone: req.body.phone
    });

    customer = await customer.save();
    res.status(201).send(customer);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer)
        return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');

    res.send(customer);
});

router.put('/:id', auth , async (req, res) => {
   
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        isVip: Joi.boolean().required() ,
        phone: Joi.string().min(5).max(50).required() 
   })
   
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

     const customer = await Customer.findByIdAndUpdate(req.params.id, {name: req.body.name},{phone: req.body.phone});
    if (!customer)
        return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');


    res.send(customer);
});

router.delete('/:id', auth , async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if (!customer)
        return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');

    
    res.send(customer);
});

module.exports = router;