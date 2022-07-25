const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const router = express.Router();


const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    }
})

const Category = mongoose.model('Category', categorySchema);

async function createCategory(){
    const category = new Category({
        name: "Kompyuter tarmoqlari",
    })

    const result = await category.save();
    console.log(result);
}

async function deletedCategory(id){
    const result = await Category.findByIdAndRemove({_id: id})
        console.log(result);
}

// deletedCategory('62de219b21b153d0cc7ae210');

router.get('/', async (req, res) => {
    const categories = await Category.find().sort('name');
    res.send(categories);
});

router.post('/', async (req, res) => {
    const { error } = validateCategory(req.body);
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

router.put('/:id', async (req, res) => {
   
    const { error } = validateCategory(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

     const category = await Category.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true});
    if (!category)
        return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');


    res.send(category);
});

router.delete('/:id', async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);
    if (!category)
        return res.status(404).send('Berilgan IDga teng bo\'lgan toifa topilmadi');

    
    res.send(category);
});

function validateCategory(category) {
    const schema = {
        name: Joi.string().required().min(3)
    };

    return Joi.validate(category, schema);
}

module.exports = router;