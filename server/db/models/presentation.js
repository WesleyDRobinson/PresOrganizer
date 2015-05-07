'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    media: { type: [
        { type: String, //video, image, pdf , powerpoint? 
        url: String}
    ], required: true},
    title: {type: String, required: true},
    presenter: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
    settings: {group: Number, autoPlay: Boolean, loopStart: Boolean, loopEnd:  Boolean}

});



mongoose.model('Presentation', schema);