'use strict';

var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {type: String, required: true},
    organizers: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    owner: {type: mongoose.Schema.ObjectId, ref: 'User'},
    description: String
});

mongoose.model('Locale', schema);

// schema.method('removeOrganizer', function(organizerId, callback){

// });

// schema.method('addLeader', function(organizerId, callback){

// });

// schema.method('removeLeader', function(organizerId, callback){

// });