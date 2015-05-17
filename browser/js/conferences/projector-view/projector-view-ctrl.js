
app.controller("ProjectorView", function($scope){
	var socket = io();
	//console.log("projector view");
	$scope.mouse = function() {
		console.log("hi");
	};
	//console.log('here!!!');
	socket.on("play", function(data){
		console.log('play index', data);

	});

});
