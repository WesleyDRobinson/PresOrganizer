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


require('../../../server/db/models/conference');
require('../../../server/db/models/locale');
require('../../../server/db/models/user');

var Conference = Promise.promisifyAll(mongoose.model('Conference'));
var Locale = Promise.promisifyAll(mongoose.model('Locale'));
var User = Promise.promisifyAll(mongoose.model('User'));

describe('Conference GET, POST, PUT, DELETE routes', function () {
    var testCategory;
    var testProduct;
    var testListItem;
    var testUser;
    var altCategory;
    var altProduct;
    var altListItem;
    var altUser;
    var conferenceId, KyotoId, presenterId, kyotoDate;

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    beforeEach('Make locales and a bunch of Conferences', function (done) {
        var person = new User({
            name: "Evan"
        });

        User.create({ name: "Evan"})
        .then( function (user) {
            presenterId = user._id;

        	Locale
            .create({ name: 'Kyoto' })
            .then(function (locale) {
                KyotoId = locale._id;
                Conference.create([
                {
                    name: 'Kyoto Vol.13',
                    date: 'March 3, 2015',
                    venue: 'Urban Guild',
                    locale: locale._id,
                    presenters: [presenterId]
                },
                {
                    name: 'Kyoto Vol.13 1/2',
                    date: '',
                    venue: 'Urban Guild',
                    locale: locale._id
                }])
                .then(function (conference) {
                    //console.log('created this conference: ', conference);
                    kyotoDate = conference.date;
                });
            });
        })
        .then(null, done);

        Locale
        .create({ name: 'New York' })
        .then(function (locale) {
            Conference.create(
                {
                    name: 'New York Vol.7',
                    date: '',
                    vanue: 'Fullstack Academy',
                    locale: locale._id
                }                
            )
            .then(function (conference) {
                //console.log('created this conference: ', conference);
                conferenceId = conference._id;
                done();
            });           
        })
        .then(null, done);

    });

    after('Clear test database', function (done) {
        clearDB(done);
    });
    
    describe ("POST", function () {
        it('should exist after creation', function (done) {
            var newConf = {
                name: 'Brooklyn Vol. 3',
                date: 'June 3, 2015'
            }
            request(app)
                .post("/api/conference/")
                .send(newConf)
                .end( function (err, data) {
                    if (err) done(err);
                    expect(data.body.name).to.equal('Brooklyn Vol. 3');
                    done();
                });
        });        
    });

    describe ("GET", function (){
        it('should return all conferences for given locale', function (done) {
            request(app)
                .get("/api/conference?locale=" + KyotoId)
                .end( function (err, data) {
                    if (err) done(err);
                    expect(data.body[0].name).to.equal('Kyoto Vol.13');
                    expect(data.body[0].presenters[0].name).to.equal('Evan');
                    expect(data.body[1].name).to.equal('Kyoto Vol.13 1/2');
                    done();
                });
        });
    
        it("should return a conference by ID", function (done) {
            request(app)
                .get("/api/conference?_id=" + conferenceId)
                .end( function (err, data) {
                    if (err) done(err);
                    expect(data.body[0].name).to.equal('New York Vol.7');
                    done();
                });
        });

        it("should return a conference by locale ID and date", function (done) {
            request(app)
                .get("/api/conference?locale=" + KyotoId + '&date=' + kyotoDate)
                .end( function (err, data) {
                    if (err) done(err);
                    expect(data.body[0].name).to.equal("Kyoto Vol.13");
                    done();
                });
        });

        it("should return a conference by locale ID and presenter id", function (done) {
            request(app)
                .get("/api/conference?locale=" + KyotoId +'&presenters=' + presenterId)
                .end( function (err, data) {
                    if (err) done(err);
                    expect(data.body[0].name).to.equal('Kyoto Vol.13');
                    done();
                });
        });
    });

    describe ("PUT", function (){
        it("should be able to update conference name", function (done){

            var info = { name: 'New York Vol. 20' };

            request(app)
                .put("/api/conference/" + conferenceId)
                .send(info)
                .end(function (err, res){
                    if (err) return done(err);
                    expect(res.status).to.equal(200);

                    request(app).get("/api/conference?_id=" + conferenceId)
                        .end (function (err, data){
                            if(err) return done(err);
                            expect(data.body[0].name).to.equal('New York Vol. 20');
                            done();
                    });

                });
        });
    });

    describe ("DELETE", function (){
        it("should delete a conference by id", function (done){

            var newConf = {
                name: 'Harlem Vol. 8',
                date: 'November 19, 2015'
            }
            request(app)
                .post("/api/conference/")
                .send(newConf)
                .end( function (err, data) {
                    if (err) done(err);

                    var delConf = data.body._id;
                    request(app).del("/api/conference/" + delConf)
                        .end(function (err, res){
                        if (err) return done(err);
                        expect(res.status).to.equal(200);

                        request(app).get("/api/conference?_id=" + delConf).end (function (err, res){
                            if(err) return done(err);
                            expect(res.body).to.be.empty;
                            done();
                        });
                    });
            });
        });
    });
});
