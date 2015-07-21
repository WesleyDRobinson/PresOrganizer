'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    media: [
        {
            mediaType: String, //video, image, pdf , powerpoint?
            url: String
        }
    ],
    title: {type: String, required: true},
    presenter: {type: mongoose.Schema.ObjectId, ref: 'User', required: true}
});

mongoose.model('Presentation', schema);