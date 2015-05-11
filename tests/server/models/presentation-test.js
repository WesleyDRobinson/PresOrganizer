// testing for presentation models

var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');


require('../../../server/db/models/presentation');
var Presentation = mongoose.model('Presentation');
require('../../../server/db/models/user');
var User = mongoose.model('User');



describe('Presentation Model', function () {


   beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
	});

	describe('on Presentation Create', function () {
	 	var retrievedPresentation, userId;

	  	beforeEach('creating presentation before testing', function (done) {

	    User.create({
	            name: "Sam Hains"
	     })
	    .then(function(user){
	        userId = user._id;
	        return Presentation.create(
	        	{ media:[ {mediaType:'image',url:'image.com'} ],
	        	title:'P1',
	        	presenter: userId });
	      })
	    .then(function(presentation){
	  		
	        retrievedPresentation = presentation;
	        retrievedPresentation.addMedia({mediaType:'video',url:'video.com'});
            done();  
	      })
	    .then(null, done);
    });
	    // it('tests addMedia method of model', function () {
	    //     expect(retrievedPresentation.title).to.equal("P1");
	    //     expect(retrievedPresentation.media.length).to.equal(2);
	    //     expect(retrievedPresentation.media[1].url).to.equal('video.com');
	    //     expect(retrievedPresentation.media[1].mediaType).to.equal('video');
	    // });
	    // it('tests removeMedia method of model', function () {
	      	
	    //   	retrievedPresentation.removeMedia(0, function(err,presentation){
	    //   		expect(retrievedPresentation.media[0].url).to.equal('video.com');
	    //     	expect(retrievedPresentation.media[0].mediaType).to.equal('video');
	    //   	});
	        
	    // });


	});
});