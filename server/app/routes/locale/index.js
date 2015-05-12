var router = require('express').Router();
var mongoose = require('mongoose');
var Locale = mongoose.model('Locale');
//var bluebird = require('bluebird');


//Create a Locale
router.post('/', function (req, res, next) {
    Locale.create(req.body)
        .then(function (locale) {
            res.send(locale);
        })
        .then(null, next);
});

//get all Locales
router.get('/', function (req, res, next) {
    Locale.find(req.query, function (err, locales) {
        if (err)
            return next(err);

        res.send(locales);
    });
});


//update Locale
router.put('/:id', function (req, res, next) {
    var id = req.params.id;
    Locale.findByIdAndUpdate(id, req.body, function (err, locale) {
        if (err) {
            return next(err);
        }
        res.send(locale);
    });

});


// delete a locale
router.delete('/:id', function (req, res, next) {
    Locale.findByIdAndRemove(req.params.id, function (err, locale) {
        if (err) return next(err);
        res.send(locale);
    });
});


module.exports = router;