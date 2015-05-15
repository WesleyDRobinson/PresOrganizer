'use strict';
var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate');

var Conference = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    date: Date,
    venue: String,
    presenters: [ {type: mongoose.Schema.ObjectId, ref: 'User'} ],
    timeline:  [ {type: mongoose.Schema.ObjectId, ref: 'TimeLineItem'} ],
    locale: { type: mongoose.Schema.ObjectId, ref: 'Locale'}
});

var TimeLineItem = new mongoose.Schema({
    title: String, // presentation, pause, loopStart, loopEnd
    presentation: {type: mongoose.Schema.ObjectId, ref: 'Presentation'}
});

Conference.plugin(deepPopulate);

// schema.method('insertInTimeline', function(presentationId, callback){

// });

// schema.method('deleteFromTimeline', function(presentationId, callback){

// });

// schema.method('adjustTimeline', function(presentationId, newPosition, callback){

// });

mongoose.model('Conference', Conference);
mongoose.model('TimeLineItem', TimeLineItem);