'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    media: { type: [
        { type: String, //video, image, pdf , powerpoint? 
        url: String}
    ], required: true},
    title: {type: String, required: true},
    presenter: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
    settings: {group: Number, autoPlay: {type: Boolean, default: true}, loopStart: Boolean, loopEnd:  Boolean}

});

schema.pre('save', function(next){
    var mediaArr = this.media;
    var valid = true;
    mediaArr.forEach(function(media){
        //check for approved media types/extensions

    });
});


schema.method('addMedia', function(mediaObj, callback){

});

schema.method('removeMedia', function(mediaObj, callback){

});

schema.method('positionMedia', function(mediaObj, mediaIndex, callback){

});

schema.static('toggleAutoPlay', function(callback){

});

schema.static('setGroupNumber', function(groupNum, callback){

});

schema.static('setLoopStart', function(bool, callback){

});

schema.static('setLoopEnd', function(bool, callback){

});

mongoose.model('Presentation', schema);