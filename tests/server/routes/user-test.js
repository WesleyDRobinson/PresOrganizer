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


var User = Promise.promisifyAll(mongoose.model('User'));


describe('User GET, POST, PUT, DELETE routes', function () {
    var testCategory;
    var testProduct;
    var testListItem;
    var testUser;
    var altCategory;
    var altProduct;
    var altListItem;
    var altUser;
    var userId;

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    beforeEach('Make a User', function (done) {

        User.create([
        {
            name: 'Ash',
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
        .then(function(user){

            userId = user._id;
            done();
        })
        .then(null,done);

    });
    

    after('Clear test database', function (done) {
        clearDB(done);
    });

    describe ("GET", function (){

// TODO make available to admin only
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

        // Visually confirmed working, test not working;
        // TODO -- optional -- make test work
        it('should return a user based on search by Id', function (done) {
            request(app)
                .get("/api/user/" + userId)
                //receive array of items with category === category we submitted
                .end( function (err, data){
                    expect(data.body.name).to.equal('Ash');
                    done();
                });
        });

    describe ("DELETE", function (){
        it("should delete a user by id", function (done){
            request(app).del("/api/user/" + userId)
                .end(function (err, response){
                    if (err) return done(err);
                    expect(response.status).to.equal(200);

                    request(app).get("/api/user" + userId).end (function (err, response){
                        if(err) return done(err);
                        expect(response.status).to.equal(404);
                        done();
                    });
                });
        });
    });

    describe ("PUT", function (){

        it("should be able to update a user's email", function (done){

            var info = { email: 'ash@ryan.com' };

            request(app).put("/api/user/" + userId + "/changeEmail").send(info)
                .end(function (err, response){
                    if (err) return done(err);
                    expect(response.status).to.equal(200);

                    request(app).get("/api/user/" + userId).end (function (err, response){
                        if(err) return done(err);
                        response.res.body.should.have.property("email", info.email);
                        done();
                    });

                });
        });
    });

// // TODO make available to admin and superuser only
//         it('should return collection of listitems created by a user AND only items created by that user ', function (done) {
//             request(app)
//                 .get("/api/listitems/user/" + testUser._id)
//                 //receive array of itmes with category === category we submitted
//                 .end( function (err, data){
//                     //console.log("listItemArr at test: ", data.res.body);
//                     data.res.body[0].creator.firstName.should.equal('Ned');
//                     done();
//                 });
//         });

// // TODO make available to admin only
//         it('should return collection of listitems based on a product AND only items based on that Product', function (done) {
//             request(app)
//                 .get("/api/listitems/product/" + testProduct._id)
//                 .end( function (err, data){
//                     data.res.body[0].product.name.should.equal('Space Toilet Paper');
//                     done()
//                 });
//         });

//         it('should return a single listitem', function (done) {
//             request(app)
//                 .get("/api/listitems/item/" + testListItem._id)
//                 .end(function (err, data) {
//                     data.res.body.should.have.property('_id', testListItem._id.toString());
//                     done();
//                 });
//         });
});

// //TODO make POST, PUT, DEL available to admin and superuser only
//     describe ("POST", function (){

// //posting to listitem should create a new listitem
//         it("should create a new listitem", function (done){
//             var newListItem = {
//                 quantity : 10,
//                 price: 1000, //we are storing this in cents
//                 product : altProduct._id,
//                 category: altCategory._id,
//                 creator: altUser._id
//             };
//             var testListItem;

//             request(app).post("/api/listitems/").send(newListItem)
//                 .end(function (err, response){
//                     if (err) return done(err);

//                     expect(response.status).to.be.equal(200);

//                     testListItem = response.body; //capture the newly created and returned list item

//                     //Check that it is in database
//                     request(app).get("/api/listitems/item/" + testListItem._id).end (function (err, response){
//                         if(err) return done(err);
//                         //console.log("response.res.body: ", response.res.body);
//                         response.res.body.should.have.property("_id", testListItem._id);
//                         done();
//                     });
//                 });
//         });

//     });

});