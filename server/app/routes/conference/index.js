var router = require('express').Router();
var mongoose = require('mongoose');
var Conference = mongoose.model('Conference');
//var bluebird = require('bluebird');
////////////////////////////////////////////////////////////////////
// CREATE
// Create a conference
router.post('/',function(req, res, next){
	Conference.create(req.body)
	.then(function(conference){
		res.send(conference);
	})
	.catch(function(err){
		return next(err);
	});
});
////////////////////////////////////////////////////////////////////
// READ
// get all conferences
router.get('/:localeId', function (req, res, next) {
  var localeId = req.params.localeId;   // locale is an Id
  Conference.find({ locale: localeId }, function(err, conferences) {
    if (err) return next(err);

    res.send(conferences);
  });
});

// find by conference Id
router.get('/:conferenceId', function(req, res, next){
	var conferenceId = req.params.conferenceId;   // locale is an Id

	Conference.findById( conferenceId, function(err, conference){
		if(err) return next(err);
		
		res.send(conference);
	});
});

// get conference by date
router.get('/:localeId/:confDate', function(req, res, next){
	var localeId = req.params.localeId;   // locale is an Id
	var confDate = req.params.confDate;   // date format important
	Conference.find({ locale: localeId, date: confDate }, function(err, conferences){
		if(err) return next(err);
		
		res.send(conferences);
	});
});

// find by presenter
router.get('/:localeId/:presenter', function(req, res, next){
	var localeId = req.params.localeId;   // locale is an Id
	var presenterId = req.params.presenterId;   
	Conference.find({ locale: localeId, presenters: presenterId }, function(err, conferences){
		if(err) return next(err);
		
		res.send(conferences);
	});
});

// find by venue
router.get('/:localeId/:venue', function(req, res, next){
	var localeId = req.params.localeId;   // locale is an Id
	var venue = req.params.venue;   
	Conference.find({ locale: localeId, venue: venue }, function(err, conferences){
		if(err) return next(err);
		
		res.send(conferences);
	});
});

// find by conference name
router.get('/:localeId/:name', function(req, res, next){
	var localeId = req.params.localeId;   // locale is an Id
	var name = req.params.name;   
	Conference.find({ locale: localeId, name: name }, function(err, conferences){
		if(err) return next(err);
		
		res.send(conferences);
	});
});
////////////////////////////////////////////////////////////////////
// UPDATE
// update by conference Id
router.put('/:conferenceId', function(req, res, next){
	var conferenceId = req.params.conferenceId;   // locale is an Id
	console.log(req.body);
	Conference.findByIdAndUpdate( conferenceId, req.body, function(err, conference){
		if(err) return next(err);
		
		res.send(conference);
	});
});
////////////////////////////////////////////////////////////////////
// DELETE
// delete a conference
router.delete('/:id',function(req, res, next) {
	Conference.findByIdAndRemove(req.params.id, function (err, conference) {
		if (err) return next(err);
		res.send(conference);
	});
});

module.exports = router;