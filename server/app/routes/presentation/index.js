var router = require('express').Router();
var mongoose = require('mongoose');
var Presentation = mongoose.model('Presentation');
//var bluebird = require('bluebird');



//Create a Presentation
router.post('/',function(req,res,next){
	Presentation.create(req.body)
	.then(function(presentation){
		res.send(presentation);
	})
	.then(null, next);
});

//get all Presentations
router.get('/', function (req, res, next) {
  Presentation.find({}, function(err, presentations) {
    if (err)  
        return next(err);
      
    res.send(presentations);
  });
});

//get presentation by id
router.get('/:id', function(req,res,next){
	var id = req.params.id;
	Presentation.findById(id ,function(err,presentation){
		if(err)
			return next(err);
		res.send(presentation);
	});
});

//update Media
router.put('/:id',function(req,res,next) {
	var id = req.params.id;
	var mediaArr = req.body.media;
	var title = req.body.title;
	var presenter = req.body.presenter;
	Presentation.findByIdAndUpdate(id, req.body, function(err,presentation){
		if(err){
			return next(err);
		}
	
		res.send(presentation);
	});


});


// //add media item to media array
// router.put('/:id/MediaItem',function(req,res,next){
	

// });

// //remove media item from media array
// router.delete('/:id/MediaItem',function(req,res,next){
	

// });


// delete a presentation
router.delete('/:id',function(req,res,next) {
	Presentation.findByIdAndRemove(req.params.id, function (err, presentation) {
		if (err) return next(err);
		res.send(presentation);
	});
});





module.exports = router;