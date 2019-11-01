var createError = require('http-errors');
var express = require('express');
var passport = require('passport');
var bcrypt = require('bcrypt');
var cors = require('cors');
var path = require('path');
var session = require('express-session');
var logger = require('morgan');

// define and configure strategy for passport
var db = require('./db');
var userDb = new db.UserDb("C:\\Users\\brian\\Workspace\\dochunt-api\\users.db");
var Strategy = require('passport-local').Strategy;

passport.use(new Strategy(
  function(username, password, cb) {
    userDb.selectByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (!bcrypt.compareSync(password, user.password)) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  }));

// configure passport authenticated session persistence
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  userDb.selectById(id, function(err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// create the express application
var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// define routes
var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var userRouter = require('./routes/user');
var huntRouter = require('./routes/hunt');
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/user', userRouter);
app.use('/hunt', huntRouter);

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

module.exports = app;
