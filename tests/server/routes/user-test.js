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


require('../../../server/db/models/user');
require('../../../server/db/models/conference');
require('../../../server/db/models/locale');

var User = Promise.promisifyAll(mongoose.model('User'));
var Conference = Promise.promisifyAll(mongoose.model('Conference'));
var Locale = Promise.promisifyAll(mongoose.model('Locale'));

describe('User GET, POST, PUT, DELETE routes', function () {
    var testCategory;
    var testProduct;
    var testListItem;
    var testUser;
    var altCategory;
    var altProduct;
    var altListItem;
    var altUser;
    var testUser;

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    beforeEach('Make a User, a Locale and Conference', function (done) {

        User.create([
        {
            name: 'Ash Ryan',
            email: 'ash@beats.com'},
        {
            name: 'Wesley'
        },
        {
            name: 'Sam'
        }, 
        {
            name: 'Evan'
        }])
        .then(function(user){   // user is an array
            testUser = user;
            return Locale.create({ name: 'Kyoto', organizers: user._id })
        })
        .then(function (locale) {
            return Conference.create({ 
                    name: 'Kyoto PK presents...', 
                    venue: 'Kiyomizudera',
                    date: 'July 15, 2015',
                    presenters: testUser._id })
        })
        .then(function (conference) {
            done();
        })
        .then(null,done);
    });
    
    after('Clear test database', function (done) {
        clearDB(done);
    });

    describe ("GET", function (){
        it('should return collection of all users', function (done) {
            request(app)
                .get("/api/user")
                .end( function (err, data) {
                    if (err) done(err);
                    expect(data.body[1].name).to.equal('Wesley');
                    expect(data.body[2].name).to.equal('Sam');
                    expect(data.body[3].name).to.equal('Evan');
                    done();
                });
        });
        it('should return a user based on search by Id', function (done) {
            request(app)
                .get("/api/user?_id=" + testUser._id)
                .end( function (err, data){
                    expect(data.body[0].name).to.equal('Ash Ryan');
                    done();
                });
        });
        it('should return a user based on search by name', function (done) {
            request(app)
                .get("/api/user?name=" + testUser.name)
                .end( function (err, data){
                    expect(data.body[0].name).to.equal('Ash Ryan');
                    done();
                });
        });
    });
    
    describe ("GET for organizer / presenter check", function () {
        it('should check using user id if user is an organizer in a given locale', function (done) {
            request(app)
                .get("/api/user/isOrganizer/" + testUser._id)
                .end( function (err, data){
                    expect(data.body).to.equal(true);
                    done();
                });
        });
        it('should check using user id if user is an presenter in a given conference', function (done) {
            request(app)
                .get("/api/user/isPresenter/" + testUser._id)
                .end( function (err, data){
                    expect(data.body).to.equal(true);
                    done();
                });
        });    
        it('should return false if id does not match a presenter in db', function (done) {
            User.create({ name: 'Rando Calrissian'})
                .then(function (someUser) {
                    request(app)
                        .get("/api/user/isPresenter/" + someUser._id)
                        .end( function (err, data){
                            console.log('data body', data.body);
                            expect(data.body).to.equal('{}');
                            done();
                        });
                });
        });  
    });

    describe ("DELETE", function (){
        it("should delete a user by id", function (done){
            request(app).del("/api/user/" + testUser._id)
                .end(function (err, response){
                    if (err) return done(err);
                    expect(response.status).to.equal(200);

                    request(app).get("/api/user?_id=" + testUser._id).end (function (err, response){
                        if(err) return done(err);
                        expect(response.body).to.have.length(0);
                        done();
                    });
                });
        });
    });

    describe ("PUT", function (){

        it("should be able to update a user's email", function (done){

            var info = { email: 'ash@ryan.com' };

            request(app).put("/api/user/" + testUser._id).send(info)
                .end(function (err, response){
                    if (err) return done(err);
                    expect(response.status).to.equal(200);

                    request(app).get("/api/user?_id=" + testUser._id).end (function (err, response){
                        if(err) return done(err);
                        response.body[0].should.have.property("email", info.email);
                        done();
                    });

                });
        });
        it("should be able to update a user's email and name", function (done){

            var info = { email: 'JACK@ryan.com', name: 'Jack Ryan' };

            request(app).put("/api/user/" + testUser._id).send(info)
                .end(function (err, response){
                    if (err) return done(err);
                    expect(response.status).to.equal(200);

                    request(app).get("/api/user?_id=" + testUser._id).end (function (err, response){
                        if(err) return done(err);
                        response.body[0].should.have.property("email", info.email);
                        expect(response.body[0].name).to.equal("Jack Ryan");
                        done();
                    });

                });
        });
        it("should not update anything if no new attributes are sent", function (done) {
            var info = {};
            request(app).put("/api/user/" + testUser._id).send(info)
                .end(function (err, response){
                    if (err) return done(err);
                    expect(response.status).to.equal(200);

                    request(app).get("/api/user?_id=" + testUser._id).end (function (err, response){
                        if(err) return done(err);
                        response.body[0].should.have.property("email", "ash@beats.com");
                        done();
                    });

                });
        });
    });
});