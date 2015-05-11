'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    media: [
        { mediaType: String, //video, image, pdf , powerpoint? 
        url: String}
    ],
    title: {type: String, required: true},
    presenter: {type: mongoose.Schema.ObjectId, ref: 'User', required: true}
});

// schema.pre('save', function(next){
//     // var mediaArr = this.media;
//     // var invalid = [];
//     // var approvedTypes = ['video','image'];
//     // mediaArr.forEach(function(media){
//     //     //check for approved media types/extensions
//     //     if (!approvedTypes.indexOf(media.type)) {
//     //         invalid.push(media);
//     //         // additional to indicate which media objects are invalid
//     //     }
//     // });
// });


schema.method('addMedia', function(mediaObj, callback){
    this.media.push(mediaObj);
    this.save(callback);
}); 

schema.method('removeMedia', function(index, callback){
    this.media.splice(index,1);
    this.save(callback);

});

// schema.method('positionMedia', function(oldIndex, newIndex, callback){
//     var mediaObj = this.media[oldIndex];
//     if (newIndex < oldIndex)  oldIndex++ ;
//     this.media.splice(newIndex, 0, mediaObj);
//     this.media.splice(oldIndex,1);
// });


mongoose.model('Presentation', schema);