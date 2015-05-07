'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {type: String, required: true},
    date: {type: Date, required: true},
    place: {type: mongoose.Schema.ObjectId, ref: 'Locale', required: true},
    organizers: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    timeline:  [{type: mongoose.Schema.ObjectId, ref: 'Presentation'}]
});


// schema.method('insertInTimeline', function(presentationId, callback){

// });

// schema.method('deleteFromTimeline', function(presentationId, callback){

// });

// schema.method('adjustTimeline', function(presentationId, newPosition, callback){

// });

// schema.method('addOrganizer', function(organizerId, callback){

// });

// schema.method('removeOrganizer', function(organizerId, callback){

// });




mongoose.model('Conference', schema);