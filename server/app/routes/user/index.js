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

//get all users
router.get('/', function (req, res, next) {
  User.find({}, function(err, users) {
    if (err)  
        return next(err);
      
    res.send(users);
  });
});

//Determine whether user is Organizer based on Locale Search
router.get('/isOrganizer/:id', function(req,res,next){
	var id = req.params.id;

	Locale.find({organizers:id}, function(err, locales){
		if(locales.length>0)
			res.send(true);
		else
			res.send(false);

	});
	
	
});

//Determine whether user is Presenter based on Locale Search
router.get('/isPresenter/:id', function(req,res,next){
	var id = req.params.id;

	Conference.find({organizers:id}, function(err, locales){
		if(locales.length>0)
			res.send(true);
		else
			res.send(false);

	});
	
	
});


//get user by id
router.get('/:id', function(req,res,next){
	var id = req.params.id;
	User.findById(id ,function(err,user){
		if(err)
			return next(err);
		res.send(user);
	});
});



// delete a user
router.delete('/:id',function(req,res,next) {
	User.findByIdAndRemove(req.params.id, function (err, user) {
		if (err) return next(err);
		res.send(user);
	});
});



// //Update a Particular User email address
router.put('/:id/changeEmail/', function (req, res, next) {
    User.findById(req.params.id, function (err, user){

      user.email = req.body.email;
      //req.body is empty
      //console.log('req',req.body);
      user.save(function(err, savedUser){
         if (err)  { 
            console.log(err);
            return next(err);
          }
         res.send(savedUser);
      });
    });
});


module.exports = router;