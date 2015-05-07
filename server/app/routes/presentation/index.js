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
	.catch(function(err){
		return next(err);
	});
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
router.put('/:id/Media',function(req,res,next){

	var id = req.params.id;
	var mediaArr = req.body.media;
	Presentation.findById(id, function(err,presentation){
		if(err)
			return next(err);
		presentation.media = mediaArr;
		presentation.save(function(err,presentation){
			if(err)
				return next(err);
			res.send(presentation);
		});
	});


});


//delete contents of media array
router.delete('/:id/Media',function(req,res,next){
	var id = req.params.id;
	var mediaArr = req.body.media;
	Presentation.findById(id, function(err,presentation){
		if(err)
			return next(err);
		presentation.media = [];
		presentation.save(function(err,presentation){
			if(err)
				return next(err);
			res.send(presentation);
		});
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