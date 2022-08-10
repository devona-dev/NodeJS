const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { Courser } = require('../models/courser');
const { Category } = require('../models/category')



router.get('/', async (req, res) => {
    const coursers = await Courser.find().sort('titles');
    res.send(coursers);
});

router.post('/', async (req, res) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        categoryId: Joi.string().required(),
        trainer: Joi.string().min(5).max(50).required(),
        status: Joi.string().min(5).max(50).required(),
        tags: Joi.array().items(Joi.string()),
        fee: Joi.string().max(200).required()
    })

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const category = await Category.findById(req.body.categoryId);

    let courser = new Courser ({
        title: req.body.title,
        category: {
            _id: category._id,
            name: category.name
        },
        trainer: req.body.trainer,
        tags: req.body.tags,
        status: req.body.status,
        fee: req.body.fee
    });

    courser = await courser.save();
    res.status(201).send(courser);
});

router.get('/:id', async (req, res) => {
    const schema = Joi.object({
        title: Joi.string().min(5).max(50).required(),
        categoryId: Joi.string().required(),
        trainer: Joi.string().min(5).max(50).required(),
        status: Joi.string().min(5).max(50).required(),
        tags: Joi.array().items(Joi.string())
    })

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const courser = await Courser.findById(req.params.id);
    if (!courser)
        return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');

    res.send(courser);
});

router.put('/:id', async (req, res) => {
   
    // const schema = Joi.object({
    //     title: Joi.string().min(5).max(50).required(),
    //     category: Joi.string().required(),
    //     trainer: Joi.string().min(5).max(50).required(),
    //     status: Joi.string().min(5).max(50).required(),
    //     tags: Joi.array().items(Joi.string())
    // })

    // const { error } = schema.validate(req.body);
    // if (error) {
    //     return res.status(400).send(error.details[0].message);
    // }
     const courser = await Courser.findByIdAndUpdate(req.params.id,
         { 
            title: req.body.name,
            category: {
                _id: category._id,
                name: category.name
            },
            trainer: req.params.trainer,
            tags: req.params.tags,
            status: req.params.status
            
        });
    if (!courser)
        return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');


    res.send(courser);
});

router.delete('/:id', async (req, res) => {
    const courser = await Courser.findByIdAndRemove(req.params.id);
    if (!courser)
        return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');

    
    res.send(courser);
});

module.exports = router;