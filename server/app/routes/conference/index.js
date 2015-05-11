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
// find by queries
router.get('/', function(req, res, next){
	Conference.find(req.query, function(err, conferences){
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