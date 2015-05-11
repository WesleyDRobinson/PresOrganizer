var router = require('express').Router();
var mongoose = require('mongoose');
var Conference = mongoose.model('Conference');
//var bluebird = require('bluebird');



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

// get all conferences
router.get('/', function (req, res, next) {
  Conference.find({}, function(err, conferences) {
    if (err) return next(err);

    res.send(conferences);
  });
});

// get conference by id
router.get('/:id', function(req, res, next){
	var id = req.params.id;
	Conference.findById(id, function(err, conference){
		if(err) return next(err);
		
		res.send(conference);
	});
});



// delete a conference
router.delete('/:id',function(req, res, next) {
	Conference.findByIdAndRemove(req.params.id, function (err, conference) {
		if (err) return next(err);
		res.send(conference);
	});
});



// Update a particular conference
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