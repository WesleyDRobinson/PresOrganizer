var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

require('../../../server/db/models/user');
require('../../../server/db/models/conference');
require('../../../server/db/models/presentation');

var User = mongoose.model('User');
var Conference = mongoose.model('Conference');
var TimeLineItem = mongoose.model('TimeLineItem');
var Presentation = mongoose.model('Presentation');

describe('Conference model', function () {
    var testUser,
        testConference,
        testPresentation,
        testTimeLineItem;

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    beforeEach('Make a User, Conference, and Presentation', function () {


        User.create({
            name: 'Wesley'
        }, function (user) {
            testUser = user;

            Presentation.create({
                media    : [{mediaType: 'video', url: 'www.google.com'}],
                presenter: user._id,
                title: 'My Trip to India'
            }, function (presentation) {
                testPresentation = presentation;

                TimeLineItem.create({
                    title: 'presentation',
                    presentation: presentation._id
                }, function (item) {
                    testTimeLineItem = item;

                    Conference.create({
                        name: "BrooklynJune15",
                        date: new Date("June 23, 2015"),
                        venue: "Brooklyn Bowl",
                        presenters: [ user._id ],
                        timeline: [item._id],
                        locale: 1234
                    }, function (conf) {
                        testConference = conf;
                    })
                });

            });
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
