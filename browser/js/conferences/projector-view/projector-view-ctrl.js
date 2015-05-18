
app.controller("ProjectorView", function($scope, $timeout){
	var socket = io();
	//console.log("projector view");
	if($scope.isFullsceen) $scope.fade=true;
	$scope.mouse = function() {
		// $animate.addClass('.fullScreenBtn', '')
	
		$scope.fade = false;

		$timeout(function(){
			$scope.fade = true;
		}, 2000);

		
		
		
	};


	//console.log('here!!!');
	socket.on("play", function(data){
		$scope.data = data;
		$scope.$digest();
	});

});
