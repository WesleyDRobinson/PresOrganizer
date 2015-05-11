var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var chai = require('chai');
var expect = chai.expect;
var assert = chai.assert;
var should = chai.should();
chai.use(require('chai-things'));

var mongoose = require('mongoose');
var Promise = require('bluebird');
var http = require("http");
var app = require("../../../server/app");
var request = require("supertest");


require('../../../server/db/models/presentation');
require('../../../server/db/models/user');


var Presentation = Promise.promisifyAll(mongoose.model('Presentation'));
var User = Promise.promisifyAll(mongoose.model('User'));


describe('Presentation GET, POST, PUT, DELETE routes', function () {
    var testPresentation;
    var testUser;
    var altPresentation;
    var altUser;

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    beforeEach('Make a test User and Presentation', function (done) {

        User.create({
            name : 'Ash',
            email: 'ash@beats.com'
        })
            .then(function (user) {
                testUser = user;
                Presentation.create({
                    media    : [{mediaType: 'image', url: "img.com"}, {mediaType: 'image2', url: "img2.com"}],
                    title    : "Presentation 1",
                    presenter: user._id
                })
                    .then(function (presentation) {
                        testPresentation = presentation;
                        done();
                    })
            })
            .then(null, done);

    });
    beforeEach('Make an alt User and Presentation', function (done) {

        User.create({
            name : 'Sam',
            email: 'sam@beats.com'
        })
            .then(function (user) {
                altUser = user;
                Presentation.create({
                    media    : [{mediaType: 'image3', url: "img3.com"}, {mediaType: 'image4', url: "img4.com"}],
                    title    : "Presentation 2",
                    presenter: altUser._id
                })
                    .then(function (presentation) {
                        altPresentation = presentation;
                        done();
                    })
            })
            .then(null, done);

    });

    after('Clear test database', function (done) {
        clearDB(done);
    });

    describe("GET", function () {

        //TODO -- make available to Organizers only
        it('should return collection of all presentations', function (done) {
            request(app)
                .get("/api/presentation")
                .end(function (err, data) {
                    if (err) done(err);
                    expect(data.body.length).to.equal(2);
                    expect(data.body[0].title).to.equal('Presentation 1');
                    expect(data.body[1].title).to.equal('Presentation 2');
                    done();
                });
        });

        it('should return a single presentation by Id', function (done) {
            request(app)
                .get("/api/presentation/" + testPresentation._id)
                //receive array of items with category === category we submitted
                .end(function (err, data) {
                    expect(data.body.title).to.equal('Presentation 1');
                    done();
                });
        });

        describe("POST", function () {
            it("should create a presentation", function (done) {
                var newPresentation = {
                    media    : [{mediaType: "image", url: "image5.com"}],
                    title    : "Presentation 3",
                    presenter: altUser._id
                };
                request(app).post("/api/presentation")
                    .send(newPresentation)
                    .end(function (err, response) {
                        if (err) return done(err);
                        expect(response.status).to.equal(200);

                        request(app).get("/api/presentation")
                            .end(function (err, response) {
                                if (err) return done(err);
                                expect(response.body.length).to.equal(3);
                                expect(response.body[2].title).to.equal('Presentation 3');
                                done();
                            });
                    });
            });
        });

        describe("PUT", function () {
            it("should be able to update a presentation", function (done) {

                var newTitle = {title: 'Presentation 4'};

                request(app).put("/api/presentation/" + testPresentation._id)
                    .send(newTitle)
                    .end(function (err, response) {
                        if (err) return done(err);
                        expect(response.status).to.equal(200);
                        expect(response.body.title).to.equal("Presentation 4");
                        expect(response.body.media.length).to.equal(2);

                        request(app).get("/api/presentation").end(function (err, response) {
                            if (err) return done(err);
                            //console.log(response.res.body);
                            expect(response.res.body.length).to.equal(2);
                            expect(response.res.body[0].title).to.equal("Presentation 4");
                            done();
                        });

                    });
            });
        });


        describe("DELETE", function () {

            it("should create a new listitem", function (done) {

                request(app).del("/api/presentation/" + testPresentation._id)
                    .end(function (err, response) {
                        if (err) return done(err);

                        expect(response.status).to.be.equal(200);

                        request(app).get("/api/presentation")
                            .end(function (err, response) {
                                if (err) return done(err);
                                //console.log("response.res.body: ", response.res.body);
                                expect(response.res.body.length).to.equal(1);
                                done();
                            });
                    });
            });

        });

    });
});