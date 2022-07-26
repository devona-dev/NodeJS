const express = require('express');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const router = express.Router();
const {  User } = require('../models/user');
const _= require('lodash');

router.post('/', async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().min(5).max(50).required(),
        password: Joi.string().min(5).max(50).required()
   })

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({ email: req.body.email });
        if(!user)
            return res.status(400).send('Email yoki parol notogri...');
            
    const isvalidPassword = await bcrypt.compare(req.body.password, user.password);
    if(!isvalidPassword)
        return res.status(400).send('Email yoki parol notogri...');

    res.send(true)
       
});

module.exports = router;