const express = require('express');
const Joi = require('joi');
const router = express.Router();
const {  User } = require('../models/user');
const _= require('lodash');
const passwordComplexity = require("joi-password-complexity");

router.get('/', async (req, res)=>{
    const users = await User.find().sort('name');
    res.send(users);
})

router.post('/', async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required().min(3).max(50),
        email: Joi.string().min(5).max(50).required() ,
        password: {
            min: 8,
            max: 26,
            lowerCase: 1,
            upperCase: 1,
            numeric: 1,
            symbol: 1,
            requirementCount: 4,
        } 
   })

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    let user = await User.findOne({ email: req.params.email });
        if(user)
            return res.status(400).send('Bunaqa email mavjud');

        user = new User (_.pick(req.body, ['name', 'email', 'password']));
         user = await user.save();

         res.send(_.pick(user, ['_id','name', 'email']));
});

module.exports = router;