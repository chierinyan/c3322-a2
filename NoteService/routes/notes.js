var monk = require('monk');

var express = require('express');
var router = express.Router();

router.post('/signin', async (req, res) => {
    const {name, pwd} = req.body;
    try {
        const user_doc = await req.user_list.findOne({username: name});
        if (user_doc && user_doc['password'] === pwd) {
            const userid = user_doc['_id'].toString();
            req.session['userId'] = userid;
            const {icon} = user_doc;
            const note_docs = await req.note_list.find({userId: userid});
            const notes = note_docs.map(doc => {
                delete doc['userId'];
                delete doc['content'];
                return doc;
            });
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

module.exports = router;
