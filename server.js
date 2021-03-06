var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
// uncomment after placing your favicon in /public
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var responseTime = require('response-time');
var StatsD = require('node-statsd');

var routes = require('./routes/index');
var apiRoutes = require('./routes/api');

// Database
var databaseUri = 'mongodb://localhost/pocketsermons_database';
mongoose.connect(databaseUri, function (err) {
    if (err) {
        console.error(databaseUri + 'connection error.', err);
        throw(err);
    } else {
        console.log(databaseUri + ' connected.');
    }
});

var app = express();
var stats = new StatsD({prefix: 'pocketsermons_'});

// setup timing statistics
app.use(responseTime(function (req, res, time) {
    var stat = (req.method + req.url).toLowerCase()
        .replace(/[:\.]/g, '')
        .replace(/\//g, '_');
    stats.timing(stat, time);
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', routes);
app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
