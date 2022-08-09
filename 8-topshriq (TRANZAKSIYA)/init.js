const mongoose = require('mongoose');
const User = require('./models/user');

const connString = 'mongodb://localhost:27017/trans'; // ozimnikini qoyaman
async function initDatabase() {

    // bazaga ulanamiz

await mongoose.connect(connString, {
    replicaSet: 'rs',
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const senderAccountNumber = '27018' // ozimnikini qoyaman
const receiverAccountNumber = '27019' // ozimnikini qoyaman

// jonatuvchini hisob raqami boyicha bazada qidirib topamiz

let sender = await User.findOne({accountNumber: senderAccountNumber});

// agar topilmasa , unda bazaga yangi hujjat qoshamiz
    if(!sender) {
        sender = new User({
            accountNumber: senderAccountNumber, name: 'Ahmad', balance: 50000.00
        });
        await sender.save();
    }
    
// oluvchini bazaadan izlab koramiz
let receiver = await User.findOne({accountNumber: receiverAccountNumber});

// agar topilmasa bazaga yanigisini qoshib qoyamiz
    if(!receiver){
        receiver = new User({
            accountNumber: receiverAccountNumber, name: 'Anvar', balance: 1200.00
        });

        await receiver.save();
    }
}

// initDatabase functsiyamizni modulimizda eksport qilamiz
module.exports = initDatabase;
