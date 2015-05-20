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

router.get('/me', function (req, res, next) {

	res.send(req.user);
	
});
// delete a user
router.delete('/:id',function (req,res,next) {
	User.findByIdAndRemove(req.params.id, function (err, user) {
		if (err) return next(err);
		res.send(user);
	});
});



//Update User Password
router.put('/changePassword', function (req, res, next) {
    var id = req.user.id;
    User.findById(id, function (err, user){
     user.password = req.body.password;
      user.save(function(err, savedUser){
         if (err) return next(err);
         res.send(savedUser);
      });
    });
});


// Update the current user's attributes
router.put('/me', function (req, res, next) {
	var id = req.user.id;
	if (req.body) {
		User.findByIdAndUpdate(id, req.body, function (updatedUser) {
			res.send(updatedUser);
		});
	} else {
		next();
	}
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