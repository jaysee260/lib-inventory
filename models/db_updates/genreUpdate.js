/*
    On 01/18/18, a change was made to the Book Schema;
    The `genre` property was changed from a single String
    value to an Array that can contain several String values,
    thus allowing for the assignment of more than one genre
    to a book.

    This script made that modification to all documents in
    the database which were inserted under the previous
    Schema design.
*/

// Run code in this block first
{
    db.books.find({'genre': {'$exists': 'true'}}).forEach(doc => {
        db.books.updateOne(doc, {'$set': {'genre': [doc.genre]}});
    })
}

// Run code in this block second
{
    db.books.updateMany({}, {'$rename': {'genre': 'genres'}});
}