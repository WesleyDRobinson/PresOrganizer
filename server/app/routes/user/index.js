var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Locale = mongoose.model('Locale');
var Conference = mongoose.model('Conference');
//var bluebird = require('bluebird');


//Create a user
router.post('/',function(req,res,next){
	User.create(req.body)
	.then(function(user){
		res.send(user);
	})
	.then(null, function(err){
		return next(err);
	});
});

//get all users or 1 user by a specific search query
router.get('/', function (req, res, next) {
	User.find(req.query, function (err, users) {
		if (err) 

			return next(err);
		res.send(users);
	});
});
 
//Determine whether user is Organizer based on Locale Search
router.get('/isOrganizer/:id', function (req,res,next){
	Locale.find({ organizers: req.params.id }, function (err, locales){
		if (locales.length > 0)
			res.send(true);
		else
			res.send(false);
	});
});

//Determine whether user is Presenter based on Conference Search
router.get('/isPresenter/:id', function (req,res,next){
	Conference.find({ presenters: req.params.id }, function (err, conferences){
		if (conferences.length > 0)
			res.send(true);
		else
			res.send(false);
	});
});

// delete a user
router.delete('/:id',function (req,res,next) {
	User.findByIdAndRemove(req.params.id, function (err, user) {
		if (err) return next(err);
		res.send(user);
	});
});

// Update a user's attributes
router.put('/:id', function (req, res, next) {
	var id = req.params.id;
	if (req.body) {
		User.findByIdAndUpdate(id, req.body, function (updatedUser) {
			res.send(updatedUser);
		});
	} else {
		next();
	}
});


module.exports = router;