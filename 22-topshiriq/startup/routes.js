const express = require('express');
const errorMiddleware = require('../middleware/error')
const categoriesRoute = require('../routes/categories');
const customersRoute = require('../routes/customers');
const coursersRoute = require('../routes/coursers');
const enrollmentRoute = require('../routes/enrollments');
const usersRoute = require('../routes/users');
const authRoute = require('../routes/auth')

module.exports = function (app) {
    app.use(express.json());   
    app.use('/api/categories', categoriesRoute);
    app.use('/api/customers', customersRoute);
    app.use('/api/coursers', coursersRoute);
    app.use('/api/enrollments', enrollmentRoute);
    app.use('/api/users', usersRoute);
    app.use('/api/auth', authRoute);
    app.use(errorMiddleware);

}