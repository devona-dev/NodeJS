const mongoose = require('mongoose');
const currency = require('currency.js');
const initDatabase = require('./init');
const User = require('./models/user');
const Journal = require('./models/journal');

async function transferMoney(senderAccountNumber, receiverAccountNumber, amount) {
    // mallumotlar omboriga ulanib olib 
    // bizga kerakli bolgan malumotlarni yozib qoyamiz
    await initDatabase();

    // sessiyani boshlaymiz
    const session = await mongoose.startSession();

    // sessiyamiz ichida tranzaksiya ochamiz
    session.startTransaction();
    try{
        // jonatuvchini bazadan izlab topamiz, bunda bazaga asorov berilyapti, shuning uchun
        // tranzaksiya ichida beriladigan barcha sorovlarga sessiyani ham 
        // berib yuboramiz

        let sender = User.findOne({accountNumber: senderAccountNumber}).session(session);
        if(!sender) 
            throw new Error('Sender not found');

        // jonatuvchisni hisobidan tranzaksiya miqdoricha pulni ayirib tashlaymiz 
        sender.balance = currency(sender.balance).subtract(amount);

        if(sender.balance < 0) {
            throw new Error(`User - ${sender.name} has insufficient funds`);
        }

        // jonatuvchiga qilingan ishglarni bazaga saqlab qoyamiz
        // bu yerda sessiya obyektini yuborishni keragi yoq
        await sender.save();

        // throw new Error('Bu qanaqadir xatolik , tekshirish uchun')
        // jonatuvchinig hisobida pul yechib olinganligi haqida 
        // bazaaga yozib qoyamiz
        let debitJournal = new Journal({
            accountNumber: senderAccountNumber, operation: 'Debit', amount: amount
        })
        await debitJournal.save()

        // oluvchini bazadan izlab topamiz agar u bolmasa xato qaytaramiz
        let receiver = await User({accountNumber: receiverAccountNumber}).session(session);
        if(!receiver)
            throw new Error('Receiver not found');

        // oluvchini tranzaksiya miqdoruicha pulni hisobiga qoshib qoyamiz
        // va uni bazaga saqlab qoyamiz
        receiver.balance = currency(receiver.balance).add(amount);
        await receiver.save()

        // oluvchinig pul olganligi haqida journalga yozib qoyamiz
        let creditJournal = new Journal({
            accountNumber: receiverAccountNumber, operation: 'Credit', amount: amount
        })
        await creditJournal.save();

        // agarda shu joygacha hammasi yaxshi kelsa sessiyani commit qilamiz
        await session.commitTransaction();
        console.log('Tranzaksion has been comleted seccesfully!');
    } catch(error){
        // agar yuqorida try bolck ichida xato chiqgan bolsa 
        // unda barcha qilingan ozgatishlar bekor qilinadi va
        // malumtlar omboriga hech narsa yozilmaydi
        await session.abortTransaction();

        console.error(error);
        throw error;
    } finally {
        // har qanday holatda ham ishimiz songida sessiyani yopamiz
        session.endSession();
    }
}

module.exports = transferMoney;