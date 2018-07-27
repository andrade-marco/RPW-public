//DB Connection & Model exports
const mongoose = require('mongoose');

//Allows debugging of DB requests
mongoose.set('debug', true);

//Sets the mongoose promise library to be the built-in promise of ES2015
//This makes database requests return promises
mongoose.Promise = Promise;

//Connecting to database
const dbUrl = process.env.DATABASE_URL || 'mongodb://localhost:27017/rpw';
const dbOptions = {keepAlive: true, useNewUrlParser: true};
mongoose.connect(dbUrl, dbOptions);

//Exporting every model
module.exports.User = require('./user');
module.exports.Story = require('./story');
module.exports.Segment = require('./segment');
