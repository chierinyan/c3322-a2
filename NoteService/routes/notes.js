var monk = require('monk');

var express = require('express');
var router = express.Router();

async function find_notes(req, userid){
    console.log(userid);
    const note_docs = await req.note_list.find({userId: userid});
    return note_docs.map(doc => {
        delete doc['userId'];
        delete doc['content'];
        return doc;
    });
}

router.post('/signin', async (req, res) => {
    const {name, pwd} = req.body;
    try {
        const user_doc = await req.user_list.findOne({username: name});
        if (user_doc && user_doc['password'] === pwd) {
            const userid = user_doc['_id'].toString();
            req.session['userId'] = userid;
            const {icon} = user_doc;
            const notes = await find_notes(req, userid);
            res.json({
                icon: icon,
                notes: notes
            });
        } else {
            res.send('Login failure');
        }
    } catch (err) {
        console.error(err);
        res.send(err);
    }
});

router.get('/logout', (req, res) => {
    req.session['userId'] = null;
    res.send('');
});

router.get('/getnote', async (req, res) => {
    try {
        const {noteid} = req.query;
        let note_doc = await req.note_list.findOne({_id: monk.id(noteid)});
        delete note_doc['userId'];
        res.json(note_doc);
    } catch (err) {
        console.error(err);
        res.send(err);
    }
});

router.post('/addnote', async (req, res) => {
    try {
        const {note} = req.body;
        note['userId'] = req.session['userId'];
        update_time(note);
        await req.note_list.insert(note, (_, doc) => {
            delete doc['userID'];
            delete doc['content'];
            res.json(doc)
        });
    } catch (err) {
        console.error(err);
        res.send(err);
    }
});

function update_time(note) {
    const now = new Date();
    note['lastsavedtime'] = now.toTimeString().split(' ')[0] + ' ' + now.toDateString();
}

module.exports = router;
