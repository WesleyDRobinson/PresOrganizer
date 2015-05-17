'use strict';
var socketio = require('socket.io');
var io = null;

module.exports = function (server) {

    if (io) return io;

    io = socketio(server);

    io.on('connection', function (socket) {

        socket.on('play',function(data){
        	io.sockets.emit('play',data);
        });
    });
    
    return io;

};
