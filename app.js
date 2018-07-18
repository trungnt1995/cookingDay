var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose    = require('mongoose');
var jwt    = require('jsonwebtoken'); 
var config = require('./config'); 
var cors = require('cors')


var User   = require('./models/userModel'); 
var Category   = require('./models/categoryModel'); 
var Food   = require('./models/foodModel'); 
var Image   = require('./models/imageModel'); 
var Comment   = require('./models/commentModel'); 

var index = require('./routes/index');
var users = require('./routes/users');
var category = require('./routes/category');
var food = require('./routes/foods');
var image = require('./routes/image');
var comment = require('./routes/comment');

var app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
mongoose.Promise = global.Promise;
mongoose.connect(config.url);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next) {
  if (req.headers && req.headers.token) {
    jwt.verify(req.headers.token, config.secret, function(err, decode) {
      if (err) req.user = undefined;
      req.user = decode;
      next();
    });
  } else {
    req.user = undefined;
    next();
  }
});

app.use('/', index);
app.use('/users', users);
app.use('/category', category);
app.use('/food', food);
app.use('/image', image);
app.use('/comment', comment);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
