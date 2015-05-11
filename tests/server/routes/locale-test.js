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

var Locale = Promise.promisifyAll(mongoose.model('Locale'));
var User = Promise.promisifyAll(mongoose.model('User'));


describe('Locale GET, POST, PUT, DELETE routes', function () {
    var testLocale;
    var altLocale;
    var altUser;

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    beforeEach('Make a test User and Locale', function (done) {

        Locale.create(
            [{
            name : 'Kyoto'
        },
        {
            name: 'Tokyo'
        },
        {
            name: 'Brooklyn'
        }], done)
        .then(null, done);

    });
    

    after('Clear test database', function (done) {
        clearDB(done);
    });

    describe("GET", function () {

        //TODO -- make available to Organizers only
        it('should return collection of all locales', function (done) {
            request(app)
                .get("/api/locale")
                .end(function (err, data) {
                    if (err) done(err);
                    console.log('data',data.body);
                    expect(data.body.length).to.equal(3);
                    expect(data.body[0].name).to.equal('Kyoto');
                    expect(data.body[2].name).to.equal('Brooklyn');
                    done();
                });
        });

        xit('should return a single locale by Id', function (done) {
            request(app)
                .get("/api/locale/" + testLocale._id)
                //receive array of items with category === category we submitted
                .end(function (err, data) {
                    expect(data.body.title).to.equal('Locale 1');
                    done();
                });
        });

        describe("POST", function () {
            xit("should create a locale", function (done) {
                var newLocale = {
                    media    : [{mediaType: "image", url: "image5.com"}],
                    title    : "Locale 3",
                    presenter: altUser._id
                };
                request(app).post("/api/locale")
                    .send(newLocale)
                    .end(function (err, response) {
                        if (err) return done(err);
                        expect(response.status).to.equal(200);

                        request(app).get("/api/locale")
                            .end(function (err, response) {
                                if (err) return done(err);
                                expect(response.body.length).to.equal(3);
                                expect(response.body[2].title).to.equal('Locale 3');
                                done();
                            });
                    });
            });
        });

        describe("PUT", function () {
            xit("should be able to update a locale", function (done) {

                var newTitle = {title: 'Locale 4'};

                request(app).put("/api/locale/" + testLocale._id)
                    .send(newTitle)
                    .end(function (err, response) {
                        if (err) return done(err);
                        expect(response.status).to.equal(200);
                        expect(response.body.title).to.equal("Locale 4");
                        expect(response.body.media.length).to.equal(2);

                        request(app).get("/api/locale").end(function (err, response) {
                            if (err) return done(err);
                            //console.log(response.res.body);
                            expect(response.res.body.length).to.equal(2);
                            expect(response.res.body[0].title).to.equal("Locale 4");
                            done();
                        });

                    });
            });
        });


        describe("DELETE", function () {

            xit("should create a new listitem", function (done) {

                request(app).del("/api/locale/" + testLocale._id)
                    .end(function (err, response) {
                        if (err) return done(err);

                        expect(response.status).to.be.equal(200);

                        request(app).get("/api/locale")
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