const express = require('express');
const mongoose = require('mongoose');
const categoriesRoute = require('./routes/categories');
const app = express();
app.use(express.json());
app.use('/api/categories', categoriesRoute);

mongoose.connect('mongodb://localhost/my_db')
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
