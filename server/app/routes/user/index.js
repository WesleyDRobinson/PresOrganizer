var router = require('express').Router();
var mongoose = require('mongoose');
var User = mongoose.model('User');
//var bluebird = require('bluebird');



//Create a user
router.post('/',function(req,res,next){
	User.create(req.body)
	.then(function(user){
		res.send(user);
	})
	.catch(function(err){
		return next(err);
	});
});

//get all users or 1 user by a specific search query
router.get('/', function (req, res, next) {
	if (req.query) {
		User.find(req.query, function (err, user) {
			if (err) 
				return next(err);
			res.send(user);
		});
	} else {
		User.find({}, function (err, users) {
			if (err)
				return next(err);

			res.send(users);
		});
	}
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

// router.put('/:id/changeEmail/', function (req, res, next) {
//     User.findById(req.params.id, function (err, user){

//       user.email = req.body.email;
//       //req.body is empty
//       //console.log('req',req.body);
//       user.save(function(err, savedUser){
//          if (err)  { 
//             console.log(err);
//             return next(err);
//           }
//          res.send(savedUser);
//       });
//     });
// });


module.exports = router;