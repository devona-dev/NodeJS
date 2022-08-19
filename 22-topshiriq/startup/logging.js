require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

module.exports = function () {
    winston.add(new winston.transports.Console());
    winston.add(new winston.transports.File({ filename: 'logs/vd-logs.log', level: 'error' }));
    winston.add( new winston.transports.MongoDB({ db: 'mongodb://localhost/virtualDars-logs', level: 'info' })); // level error kodi , faqat error leveldagi xatolarni chiqaradi
    winston.exceptions.handle(new winston.transports.Console(),new winston.transports.File({ filename: 'logs/vd-logs.log', level: 'error' })); // winston varianti
    process.on('unhandledRejection', ex => { // procces varianti
        throw ex;
    });

}