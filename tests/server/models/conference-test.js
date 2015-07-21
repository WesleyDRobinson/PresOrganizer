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
var Presentation = mongoose.model('Presentation');

describe('Conference model', function () {
    var testUser,
        testConference,
        testPresentation;

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    beforeEach('Make a User, Conference, TimeLine and Presentation', function (done) {

        User.create({
            name: 'Wesley'
        })
            .then(function (user) {
                testUser = user;

                return Presentation.create({
                    media: [{mediaType: 'video', url: 'www.google.com'}],
                    presenter: user._id,
                    title: 'My Trip to India'
                })
            })
            .then(function (presentation) {
                testPresentation = presentation;

                return Conference.create({
                    name: "BrooklynJune15",
                    date: new Date("June 23, 2015"),
                    venue: "Brooklyn Bowl",
                    presenters: [testUser._id],
                    timeline: [{title: 'TLI presentation', presentation: testPresentation._id}]
                });
            })

            .then(function (conference) {
                testConference = conference;
                done();
            });
        // .catch(function (err) {
        //     done(err);
        // });    
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Conference).to.be.a('function');
    });

    // it('saves a timeline on its own', function (done) {
    //     TimeLineItem.findById(testTimeLineItem._id, function (err, item) {
    //         if (err) done(err);

    //         expect(item.title).to.equal('TLI presentation');
    //         done();
    //     });
    // });

    // it('adds a timeline item to a conference', function(done) {
    //     TimeLineItem.create({ title: 'TLI appended to conference' })
    //     .then(function (item) {
    //         return Conference.findByIdAndUpdate(
    //                 testConference._id, 
    //                 { $push: { 'timeline': item }},
    //                 { safe: true, upsert: true })
    //                 .exec();
    //     })
    //     .then(function (conference) {
    //         expect(conference.timeline).to.have.length(2);
    //         done();
    //     })
    // });

    // it('updates a timeline in a conference', function() {
    //     Conference.findOneAndUpdate({ id: testConference._id}, { timeline: ["Added timeline"]}, function(err, conference) {
    //         // console.log("TTTTTTTTTT");
    //         // console.log(conference);
    //         conference.timeline.push("Updated");

    //         Conference.findOneAndUpdate({ id: testConference._id }, { timeline: conference.timeline}, function(conference) {
    //             expect(conference.timeline.length).to.equal(2);
    //         });
    //     });
    // });
});