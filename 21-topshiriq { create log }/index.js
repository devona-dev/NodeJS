require('express-async-errors');
const express = require('express');
const mongoose = require('mongoose');
const categoriesRoute = require('./routes/categories');
const customersRoute = require('./routes/customers');
const coursersRoute = require('./routes/coursers');
const enrollmentRoute = require('./routes/enrollments');
const errorMiddleware = require('./middleware/error')
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth')
const config = require('config');
const app = express();
const winston = require('winston');
require('winston-mongodb');

winston.add(new winston.transports.Console());
winston.add(new winston.transports.File({filename: 'logs/vd-logs.log', level: 'error'}));
winston.add(new winston.transports.MongoDB({db: 'mongodb://localhost/virtualDars-logs', level: 'info'})); // level error kodi , faqat error leveldagi xatolarni chiqaradi


if(!config.get('jwtPrivateKey')){
    winston.error("JIDDIY XATOLIK: virtualdars_jwtPrivateKey muhit ozgaruvchisi aniqlanmadi...");
    process.exit(1);
}

mongoose.connect('mongodb://localhost/virtualDars')
    .then(()=>{
        winston.debug('MongoDB ga ulandi');
    })
    .catch((err)=>{
        winston.error('ulanishda xatolik', err);
    })

app.use(express.json());
app.use('/api/categories', categoriesRoute);
app.use('/api/customers', customersRoute)
app.use('/api/coursers', coursersRoute)
app.use('/api/enrollments', enrollmentRoute);
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use(errorMiddleware)

const port = process.env.PORT || 5000;

app.listen(port, () => {
    winston.info (`${port}chi portni eshitishni boshladim...`);
});
