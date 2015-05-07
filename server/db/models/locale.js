'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {type: String, required: true},
    organizers: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    leader: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
    description: String

});



mongoose.model('Locale', schema);