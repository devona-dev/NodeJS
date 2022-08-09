const express = require('express');
const Joi = require('joi');
const router = express.Router();
const {  User } = require('../models/user')

router.get('/', async (req, res)=>{
    const users = await User.find().sort('name');
    res.send(users);
})

router.post('/', async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().min(5).max(50).required() ,
        password: Joi.string().min(3).max(20).required() 
   })

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({ email: req.params.email });
        if(user)
            return res.status(400).send('Bunaqa email mavjud');

        user = new User ({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    user = await user.save();
    res.status(201).send(user);
});

module.exports = router;