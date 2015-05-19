var router = require('express').Router();
var mongoose = require('mongoose');
var Presentation = mongoose.model('Presentation');
//var bluebird = require('bluebird');

//Create a Presentation
router.post('/',function (req,res,next){
	Presentation.create(req.body)
	.then(function(presentation){
		res.send(presentation);
	})
	.then(null, next);
});

//get Presentations by query
router.get('/', function (req, res, next) {
  Presentation.find(req.query).exec()
  .then(function (presentations) {
   
    res.send(presentations);
  });
});

//update Presentation
router.put('/:id',function (req, res, next) {
	var id = req.params.id;
	Presentation.findByIdAndUpdate(id, req.body, function (err,presentation){
		if(err){
			return next(err);
		}
		res.send(presentation);
	});

});

//get all of the current users presentaitons
router.get('/user/me',function (req, res, next){

	Presentation.find({presenter:req.user.id}).exec()
	  .then(function (presentations) {
	   
	    res.send(presentations);
	  });
});

// delete a presentation
router.delete('/:id',function(req,res,next) {
	Presentation.findByIdAndRemove(req.params.id, function (err, presentation) {
		if (err) return next(err);
		res.send(presentation);
	});
});

module.exports = router;