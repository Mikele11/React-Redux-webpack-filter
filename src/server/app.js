const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
// mongoose.connect('mongodb://localhost/mern-crud', { promiseLibrary: require('bluebird') })
// eslint-disable-next-line global-require
mongoose.connect('mongodb://Mikele11:face112358@ds155396.mlab.com:55396/techinfo', { promiseLibrary: require('bluebird') })
  .then(() => console.log('connection succesful'))
  .catch(err => console.error(err));

const post = require('./routes/post');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: 'false' }));
app.use(express.static(path.join(__dirname, 'build')));

app.use('/api/post', post);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
