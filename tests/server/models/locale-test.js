
// var dbURI = 'mongodb://localhost:27017/testingDB';
// var clearDB = require('mocha-mongoose')(dbURI);

// var sinon = require('sinon');
// var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/locale');

var Locale = mongoose.model('Locale');

