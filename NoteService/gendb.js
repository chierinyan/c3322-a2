var conn = new Mongo();
var db = conn.getDB('assignment2');

db.userList.drop();
db.noteList.drop();

const {insertedIds} = db.userList.insertMany([
    {'username': 'Chieri', 'password': '2333', 'icon': 'icons/1eaa254.png'},
    {'username': 'Kinako', 'password': '2333', 'icon': 'icons/8969d5c.jpg'}
]);

db.noteList.insertMany([{
        'userId':         insertedIds[0].toString(),
        'lastsavedtime':  '20:00:00 Tue Nov 15 2022',
        'title':          'assigment2',
        'content':        'an iNotes app based on react'
    }, {
        'userId':         insertedIds[0].toString(),
        'lastsavedtime':  '21:00:00 Tue Nov 15 2022',
        'title':          'MERN stack',
        'content':        'MongoDB, Express.JS, ReactJS, Node.js'},
]);
