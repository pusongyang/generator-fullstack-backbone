/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var path = require('path');
var express = require('express');
var session = require('express-session');
var mongoose = require('mongoose');
var async = require('async');
var config = require('./config/environment');
var fs = require('fs');
var join = require('path').join;

var redis = require("redis"),
    redisCli = redis.createClient(config.redis.port, config.redis.host, config.redis.options),
    redisCliSess = redis.createClient(config.redis.port, config.redis.host, config.redis.options),
    redisStore = require('connect-redis')(session);

var connectMongo = function () {
    mongoose.connect(config.db.mongo.uri, config.db.mongo.options);
};
connectMongo();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connectMongo);

// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = module.exports = express();
app.use(session({
    store: new redisStore({client:redisCliSess,ttl:18000,db:15}),
    secret: 'ukyo.pu',
    name: 'seed.sid',
    cookie: {maxAge: 3600000, secure: false},
    resave: false,
    saveUninitialized: true
}));
require('./config/express')(app);
fs.readdirSync(join(__dirname, 'models')).forEach(function (file) {
    if (~file.indexOf('.js')) require(join(__dirname, 'models', file));
});
fs.readdirSync(join(__dirname, 'routes')).forEach(function (file) {
    if (~file.indexOf('.js')) require(join(__dirname, 'routes', file))(app);
});
app.use(function (req, res) {
    var stream404 = fs.createReadStream(path.join(config.root, config.appPath,"404.html"));
    stream404.pipe(res);
});

var server = require('http').createServer(app);
server.listen(config.port, config.ip, function () {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
