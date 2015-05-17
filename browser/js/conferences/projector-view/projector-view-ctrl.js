
app.controller("ProjectorView", function($scope){
	var socket = io();
	$scope.mouse = function() {
		console.log("hi");
	};
	console.log('here!!!');
	socket.on("play", function(data){
		console.log('play index', data);

	});

});
