const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pratice')
    .then(()=>{
        console.log('Mongo aloqada...');
    })
    .catch((err)=>{
        console.error('Ulanishda xatolik', err);
    })

const Author = mongoose.model('Author', new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
}));

const Book = mongoose.model('Book', new mongoose.Schema({
    title: String,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    } 
}));

async function createAuthor(firstName, lastName, email){
    const author = new Author({
        firstName,
        lastName,
        email
    })

    const result = await author.save();
    console.log(result);
}

async function createBook(title, authorId){
    const book = new Book({
        title: title,
        author: authorId       
    })

    const result = await book.save()
    console.log(result);
}

async function listBook(){
    const books = await Book
    .find()
    .populate('author', 'firstName -_id')
    .select('title author ');
    console.log(books);
}

// createAuthor('Devona', 'DEV', 'devona@bk.ru');

// createBook('Node to\'plamlari', '62e219b377111aaf5f1267b1');

listBook();