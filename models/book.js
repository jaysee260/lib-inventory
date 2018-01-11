var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Book TITLE is required']
    },
    author: {
        type: String,
        required: [true, 'Book AUTHOR is required']
    },
    isbn: {
        type: String,
        required: [true, 'Book ISBN is required']
    },
    genre: String,
    publisher: String,
    year_published: Date,
    pages: String
}, {versionKey: false});

var Book = mongoose.model('Book', bookSchema);

bookSchema.methods.add = function (cb) {

}

module.exports = Book;
