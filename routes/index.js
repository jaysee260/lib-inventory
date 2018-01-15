'use strict';
var express = require('express');
var router = express.Router();
var _ = require('lodash');
var Book = require('.././models/book'); // bring in Book Schema

router.get('/', (req, res) => {
    res.send('Hello from lib-inventory');
});

// Get all books
router.get('/library', (req, res) => {
    Book.find({}, function(err, books) {
        if (err) res.send(err);
        res.render('library', {
            book: books,
            typeOf: 'Library',
            count: books.length
        });
    })
});

// Render search engine
router.get('/library/find', (req, res) => {
    res.render('search');
});

// Find book by Author, Title, or ISBN
router.get('/library/find/:criteria', function(req, res) {
    // Make case insensitive
    let param = decodeURIComponent(req.params.criteria);
    let search = new RegExp(param, 'i');
    Book.find({$or: [{title: search}, {author: search}, {isbn: search}]}, function(err, result) {
        if (err) res.send(err);
        res.send(result);
    });
});

// GET - Render template with form to add book
router.get('/library/add', (req, res) => {
    res.render('add');
});

// POST - Add a book
router.post('/library/add', (req, res) => {
    let book = req.body;
    console.log(book);
    // res.send('book received!');
    if (!_.isEmpty(book)) {
        Book.create(book, function(err, response) {
            if (err) res.send({error:`${err.message}`});
        }).then(() => res.redirect(200, `${req.baseUrl}/library/add`));
    }
});

// Update book by id
router.put('/library/update/:_id', function(req, res) {
    let _id = req.params._id;
    let update = req.body;
    Book.findById(_id, function(err, book) {
        if (err) res.send(err);

        book.set(update);
        book.save(function(err, updatedBook) {
            if (err) res.send(err);
            res.send(updatedBook);
        });
    });
});

// Remove book by _id
router.delete('/library/remove/:_id', function(req, res) {
    let _id = req.params._id;
    Book.findByIdAndRemove(_id, function(err, status) {
        if (err) res.send(err);
        res.redirect(200, `${req.baseUrl}/library`);
    });
});

module.exports = router;