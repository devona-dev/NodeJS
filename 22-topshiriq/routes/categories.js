const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { Category } = require('../models/category')
const admin = require('../middleware/admin');
const auth = require('../middleware/auth');



router.get('/', async (req, res) => {
    // throw new Error('olishda xatolik');
    const categories = await Category.find().sort('name');
    res.send(categories);
});

router.post('/', auth ,async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        isVip: Joi.boolean().required() ,
        phone: Joi.string().min(5).max(50).required() 
   })

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let category = new Category ({
        name: req.body.name
    });

    category = await category.save();
    res.status(201).send(category);
});

router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category)
        return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');

    res.send(category);
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

     const category = await Category.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
    if (!category)
        return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');


    res.send(category);
});

router.delete('/:id', [auth, admin] , async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);
    if (!category)
        return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');

    
    res.send(category);
});

module.exports = router;