const express = require('express');
const mongoose = require('mongoose');
const categoriesRoute = require('./routes/categories');
const customersRoute = require('./routes/customers');
const coursersRoute = require('./routes/coursers');
const enrollmentRoute = require('./routes/enrollments')
const app = express();
app.use(express.json());
app.use('/api/categories', categoriesRoute);
app.use('/api/customers', customersRoute)
app.use('/api/coursers', coursersRoute)
app.use('/api/enrollments', enrollmentRoute)

mongoose.connect('mongodb://localhost/virtualDars')
    .then(()=>{
        console.log('MongoDB ga ulandi');
    })
    .catch((err)=>{
        console.error('ulanishda xatolik', err);
    })

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`${port}chi portni eshitishni boshladim...`);
});
