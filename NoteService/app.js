var createError = require('http-errors');
var express = require('express');
var path = require('path');
var session = require('express-session');
var logger = require('morgan');
var cors = require('cors');
var monk = require('monk');

var notesRouter = require('./routes/notes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: '23333333',
    cookie: { maxAge: 30*60*1000 },
    resave: false,
    saveUninitialized:true
}))

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.options('*', cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use( (req, _, next) => {
    let db = monk('127.0.0.1:27017/assignment2');
    req.user_list = db.get('userList');
    req.note_list = db.get('noteList');
    next();
});

app.use('/', notesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(3001);
