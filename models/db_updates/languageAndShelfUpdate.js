/*
    On 01/19/18, a change was made to the Book Schema;
    The `language` and `shelf `properties were added,
    each holding a single String value

    This script made that modification to all documents in
    the database which didn't have these fields
*/

db.books.updateMany(
    { "$and": [ { "language": { "$exists": false } }, { "shelf": { "$exists": false } } ] },
    { "$set": { 
        "language": "English",
        "shelf": "not shelved"
     } }
);