var router = require('express').Router();
var mongoose = require('mongoose');
var Locale = mongoose.model('Locale');

//Create a Locale
router.post('/', function (req, res, next) {
    Locale.create(req.body)
        .then(function (locale) {
            res.send(locale);
        })
        .then(null, next);
});

//get all Locales and their organizers (names only)
router.get('/', function (req, res, next) {
    Locale.find(req.query).populate('organizers', 'name')
        .exec()
        .then(function (locales) {
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