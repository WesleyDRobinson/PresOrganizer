var router = require('express').Router();
var mongoose = require('mongoose');
var Promise = require('bluebird');
//require('../../../../server/db/models/conference');
var Conference = Promise.promisifyAll(mongoose.model('Conference'));
////////////////////////////////////////////////////////////////////
// CREATE
// Create a conference
router.post('/',function (req, res, next) {
	console.log("hi");
	Conference.create(req.body, function (err, conference){
		if (err) return next(err);

		res.send(conference);
	});
});
////////////////////////////////////////////////////////////////////
// READ
// find by queries
router.get('/', function (req, res, next) {

	Conference.find(req.query).deepPopulate('timeline.presentation.presenter').exec(
		function (err, conferences) {
		if(err) return next(err);
		res.send(conferences);
		
	});
});
// //Evans Code
// 	Conference.find(req.query)
// 	.populate('presenters', 'name _id')
// 	.populate('locale')
// 	//.populate('locale.organizers')
// 	.exec()
// 	.then(function (conferences){
// 		console.log('populated:', conferences);
// 		res.send(conferences);
// 	})
// 	.then(null, function(err){
// 		return next(err);
////////////////////////////////////////////////////////////////////
// UPDATE
// update by conference Id
router.put('/:conferenceId', function (req, res, next){
	var conferenceId = req.params.conferenceId;   // locale is an Id
	console.log('we are updating conference', req.body);

	Conference.findByIdAndUpdate( conferenceId, req.body, function (err, conference){
		if(err) return next(err);

		res.send(conference);
	});
});

// user is added to a conference as a presenter this route fires when 
// a new presentation is created in order to associate the user as a 
// presenter of a particular conference
router.put('/:conferenceId/addpresenter', function (req, res, next){
	var conferenceId = req.params.conferenceId;   // locale is an Id

	Conference.findByIdAndUpdate( 
		conferenceId, 
		{ $addToSet: req.body },         // if user is already presenting at the conference, do not add again
		function (err, conference){
		if(err) return next(err);

		res.send(conference);
	});
});

//get all of the current users conferences
router.get('/user/me',function (req,res,next){

	Conference.find({presenters: req.user.id}).deepPopulate('timeline.presentation.presenter').exec(
		function (err, conferences){
		if(err) return next(err);
		res.send(conferences);
		
	});

});
////////////////////////////////////////////////////////////////////
// DELETE
// delete a conference

// router.put('/:conferenceId/addTimeLineItem',function(req,res,next){
// 	var conferenceId = req.params.conferenceId;
// 	var timeLineObj = req.body;
// 	console.log(timeLineObj);

// });

router.delete('/:id',function(req, res, next) {
	Conference.findByIdAndRemove(req.params.id, function (err, conference) {
		if (err) return next(err);
		res.send(conference);
	});
});

module.exports = router;