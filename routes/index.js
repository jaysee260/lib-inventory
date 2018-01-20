'use strict';
var express = require('express');
var router = express.Router();
var _ = require('lodash');
var shelf_codes = require('../views/data/shelf-codes');
var languages = require('../views/data/languages');
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
    res.render('add', {
        computer_room: {
            label: shelf_codes.computer_room.label,
            values: shelf_codes.computer_room.values
        },
        living_room: {
            label: shelf_codes.living_room.label,
            values: shelf_codes.living_room.values
        },
        languages: languages.options
    });
});

// POST - Add a book
router.post('/library/add', (req, res) => {
    let book = req.body;
    console.log(book);
    if (!_.isEmpty(book)) {
        Book.create(book, function(err, response) {
            if (err) res.send({error:`${err.message}`});
        }).then(() => {
            res.json({success: 'Book added!'});
        });
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

// Render single page for book item
router.get('/library/book/:_id', function(req, res) {
    let _id = req.params._id;
    Book.findById(_id, function(err, result) {
        if (err) res.send(err);
        console.log(result);
        res.render('book', {
            book: result,
            shelf_codes : {
                computer_room: {
                    label: shelf_codes.computer_room.label,
                    values: shelf_codes.computer_room.values
                },
                living_room: {
                    label: shelf_codes.living_room.label,
                    values: shelf_codes.living_room.values
                }
            },
            languages: languages.options

        });
    });
});

module.exports = router;