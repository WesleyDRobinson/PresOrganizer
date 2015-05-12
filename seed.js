/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

Refer to the q documentation for why and how q.invoke is used.

*/

var NUM_OF_USERS = 10;
var NUM_OF_PRESENTATIONS =10;
var NUM_OF_CONFERENCES =10;
var NUM_OF_LOCALES =10;


var mongoose = require('mongoose');
var connectToDb = require('./server/db');
var User = mongoose.model('User');
var Locale = mongoose.model('Locale');
var TimeLineItem = mongoose.model('TimeLineItem');
var Presentation = mongoose.model('Presentation');
var Conference = mongoose.model('Conference');
var q = require('q');
var chalk = require('chalk');
var Chance = require('chance');
var chance = new Chance();
var _ = require('lodash');

var getCurrentUserData = function () {
    return q.ninvoke(User, 'find', {});
};


var createUser = function(){

    var user = new User({
        name: chance.name(),
        email: chance.email(),
        password: 1234
    });

    user.save(function(err, data){
        if(err) console.error('error on user save',err);
    });

    return user.id;

};

var seedUsers = function (num) {

    var userArr = Array.apply(null, new Array(num)); 
    return userArr.map(createUser);
};

var createMedia = function(){
    return {mediaType: 'image', url:'www.image.com/'+chance.natural()};
};
var createMediaArr = function(){
    var mediaArr = Array.apply(null, new Array(20));
    mediaArr = mediaArr.map(createMedia);
    return mediaArr;
};

var createPresentation = function(userId){

    var presentation = new Presentation({
        media: createMediaArr(),
        title: chance.word(),
        presenter: userId
    });


    presentation.save(function(err, data){
        if(err) console.error('error on presentation save',err);
    });

    return presentation.id;

};


var seedTimeLineItems = function(presentationIds){
    var timeLineItemsArr = presentationIds.map(function(id){
        var timeLineItem =  new TimeLineItem({title:'presentation', presentation: id });
        timeLineItem.save(function(err, data){
            if(err)console.error('error on timelineItem save',err);
        });
        return timeLineItem.id;
    });

    var play =  new TimeLineItem({title:'play' });
    timeLineItemsArr.push(play.id);
    play.save();
    var pause= new TimeLineItem({title:'pause' });
    timeLineItemsArr.push(pause.id);
    pause.save();
    var loopStart = new TimeLineItem({title:'loopStart' });
    timeLineItemsArr.push(loopStart.id);
    loopStart.save();
    var loopEnd = new TimeLineItem({title:'loopEnd' });
    timeLineItemsArr.push(loopEnd.id);
    loopEnd.save();

    return timeLineItemsArr;
};

var seedPresentations = function(userIds, numOfPresentations){
    var presArr = Array.apply(null, new Array(numOfPresentations));
    //get the user Ids
    presArr= presArr.map(function(){
        return userIds[Math.floor(Math.random()*userIds.length)];
    });
    presArr = presArr.map(createPresentation);
    return presArr;

};
var seedLocale = function(userIds, num){
     var localeArr = Array.apply(null, new Array(num));
     localeArr = localeArr.map(function(){
        var locale = new Locale({name: chance.city(), organizers:[userIds[Math.floor(Math.random()*userIds.length)], userIds[Math.floor(Math.random()*userIds.length)]], owner: userIds[Math.floor(Math.random()*userIds.length)], description: chance.sentence()});
        locale.save();

        return locale.id;
     });
     return localeArr;


};

var seedConferences = function(userIds,timeLineIds,localeIds, num){
    var conferenceArr = Array.apply(null, new Array(num));
    var userIdsRand= _.shuffle(userIds);
    var timeLineIdsRand = _.shuffle(timeLineIds);

    conferenceArr = conferenceArr.map(function(){
        
        var conference = new Conference({
            name: chance.city(),
            date: chance.date(),
            venue: chance.city(),
            presenters: [userIdsRand[0],userIdsRand[1],userIdsRand[2],userIdsRand[3],userIdsRand[4],userIdsRand[5]],
            timeline: [timeLineIdsRand[0],timeLineIdsRand[1],timeLineIdsRand[2],timeLineIdsRand[3],timeLineIdsRand[4],timeLineIdsRand[5],timeLineIdsRand[6],timeLineIdsRand[7],timeLineIdsRand[8]]
        });
        conference.save();

        userIdsRand= _.shuffle(userIds);
        timeLineIdsRand = _.shuffle(timeLineIds);
        return conference.id;

    });
    return conferenceArr;





};



connectToDb.then(function () {
    var userIds = seedUsers(NUM_OF_USERS);
    var presentationIds = seedPresentations(userIds, NUM_OF_PRESENTATIONS);
    var timeLineIds = seedTimeLineItems(presentationIds);
    var localeIds = seedLocale(userIds, NUM_OF_LOCALES);
    var conferencesIds = seedConferences(userIds,timeLineIds,localeIds, NUM_OF_CONFERENCES);
    console.log("FINISHED SEEDING");
    return;
    



});