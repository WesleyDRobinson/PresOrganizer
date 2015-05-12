var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Locale = mongoose.model('Locale');
var Conference = mongoose.model('Conference');
//var bluebird = require('bluebird');




// //Determine whether user is Presenter based on Locale Search
// router.get('/isPresenter/:id', function(req,res,next){
// 	var id = req.params.id;
// 	console.log('presenters1');
// 	Conference.find({presenters:id}, function(err, presenters){
// 		console.log('presenters2', presenters);
// 		if(presenters.length>0)
// 			res.send({bool: true});
// 		else
// 			res.send({bool:false});
// 	});
	
	
// });


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
	console.log("hitting");
	User.find(req.query, function (err, users) {
		if (err) 

			return next(err);
		res.send(users);
	});
});
 

//Determine whether user is Organizer based on Locale Search
router.get('/isOrganizer/:id', function(req,res,next){
	var id = req.params.id;
	console.log('organizers1');
	Locale.find({organizers:id}, function(err, locales){
		if(locales.length>0)
			res.send({bool: true});
		else
			res.send({bool: false});

	});
	
	
});






// delete a user
router.delete('/:id',function(req,res,next) {
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