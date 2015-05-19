'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);


    io.on('connection', function (socket) {

    	console.log('connected',socket.id);

    	socket.on('join projection', function(room){
    		console.log('joining', room.id);
    		socket.join(room.id);
    	});

        socket.on('play',function(data){
        	io.to(data.id).emit('play',data);
        });
        
    });
    
    return io;

};
