
app.controller("ProjectorView", function($scope, $timeout,Fullscreen, $stateParams){
	var socket = io();
	$scope.fade = false;
	//console.log("projector view");
	//
	socket.on('connect',function(){
		socket.emit('join projection', {id: $stateParams.id});
	});
	
	// $scope.mouse = function() {
	// 	// $animate.addClass('.fullScreenBtn', '')

	// 	$scope.fade = false;

	// 	$timeout(function(){
	// 		$scope.fade = true;
	// 	}, 2000);
				
		
	// };
	
	Fullscreen.$on('FBFullscreen.change',function(){
		 if (Fullscreen.isEnabled()) {
            $scope.fade = true;
        }
        else {
           $scope.fade = false;
            

        } 
		

	});



	socket.on("play", function(data){
		console.log('receiving play info',data);
		$scope.data = data;
		$scope.$digest();
	});

});
