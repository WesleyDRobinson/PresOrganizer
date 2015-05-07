var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/user');
require('../../../server/db/models/conference');

var User = mongoose.model('User');
var Conference = mongoose.model('Conference');
var TimeLineItem = mongoose.model('TimeLineItem');
var Presentation = mongoose.model('Presentation');

describe('Conference model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    beforeEach('Make a User, Conference, and Presentation', function () {

        //Presentation.create()

        TimeLineItem.create({
            title: 'presentation'
            //presentation:
        });

    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Conference).to.be.a('function');
    });

    it('saves a timeline', function () {


    });
});
