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
        type: String
    },
    genres: [{
        type: String
    }],
    language: {
        type: String,
        default: "English"
    },
    shelf: {
        type: String,
        default: null
    },
    publisher: String,
    year_published: String,
    pages: String
}, {versionKey: false});

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;