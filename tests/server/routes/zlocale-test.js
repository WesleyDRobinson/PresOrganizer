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
    var testUser;
    var altLocale;
    var altUser;

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    beforeEach('Make some test Locales', function (done) {

        Locale.create(
            [{
                name: 'Kyoto'
            },
                {
                    name: 'Tokyo'
                },
                {
                    name: 'Brooklyn'
                }])
            .then(function (data) {
                testLocale = data;
                done();
            })
            .then(null, done);

    });

    after('Clear test database', function (done) {
        clearDB(done);
    });

    describe("GET", function () {

        //TODO -- make available to SUPER-ADMINS only
        it('should return collection of all locales', function (done) {
            request(app)
                .get("/api/locale")
                .end(function (err, data) {
                    if (err) done(err);
                    expect(data.body.length).to.equal(3);
                    expect(data.body[0].name).to.equal('Kyoto');
                    expect(data.body[2].name).to.equal('Brooklyn');
                    done();
                });
        });

        it('should return a single locale by Id', function (done) {
            request(app)
                .get("/api/locale/" + testLocale._id)
                //receive array of items with category === category we submitted
                .end(function (err, data) {
                    expect(data.body.name).to.equal('Kyoto');
                    done();
                });
        });
    });

    describe("POST", function () {
        it("should create a locale", function (done) {
            var newLocale = {
                name    : "New Locale"
            };

            request(app).post("/api/locale")
                .send(newLocale)
                .end(function (err, response) {
                    if (err) return done(err);
                    expect(response.status).to.equal(200);

                    request(app).get("/api/locale")
                        .end(function (err, response) {
                            if (err) return done(err);
                            expect(response.res.body.length).to.equal(4);
                            expect(response.res.body[3].name).to.equal('New Locale');
                            done();
                        });
                });
        });
    });

    describe("PUT", function () {
        it("should be able to update a locale", function (done) {

            var newTitle = {name: 'Locale 4'};

            request(app).put("/api/locale/" + testLocale._id)
                .send(newTitle)
                .end(function (err, response) {
                    if (err) return done(err);
                    expect(response.status).to.equal(200);
                    expect(response.body.name).to.equal("Locale 4");

                    request(app).get("/api/locale").end(function (err, response) {
                        if (err) return done(err);
                        //console.log(response.res.body);
                        expect(response.res.body.length).to.equal(3);
                        expect(response.res.body[0].name).to.equal("Locale 4");
                        done();
                    });

                });
        });
    });

    describe("DELETE", function () {

        it("should delete a locale", function (done) {

            request(app).del("/api/locale/" + testLocale._id)
                .end(function (err, response) {
                    if (err) return done(err);

                    expect(response.status).to.be.equal(200);

                    request(app).get("/api/locale")
                        .end(function (err, response) {
                            if (err) return done(err);
                            expect(response.res.body.length).to.equal(2);
                            done();
                        });
                });
        });

    });

});