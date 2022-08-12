const express = require('express');
const mongoose = require('mongoose');
const categoriesRoute = require('./routes/categories');
const customersRoute = require('./routes/customers');
const coursersRoute = require('./routes/coursers');
const enrollmentRoute = require('./routes/enrollments');
const usersRoute = require('./routes/users');
const authRoute = require('./routes/auth')
const config = require('config');
const app = express();

if(!config.get('jwtPrivateKey')){
    console.error("JIDDIY XATOLIK: virtualdars_jwtPrivateKey muhit ozgaruvchisi aniqlanmadi...");
    process.exit(1);
}

mongoose.connect('mongodb://localhost/virtualDars')
    .then(()=>{
        console.log('MongoDB ga ulandi');
    })
    .catch((err)=>{
        console.error('ulanishda xatolik', err);
    })

app.use(express.json());
app.use('/api/categories', categoriesRoute);
app.use('/api/customers', customersRoute)
app.use('/api/coursers', coursersRoute)
app.use('/api/enrollments', enrollmentRoute);
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`${port}chi portni eshitishni boshladim...`);
});
