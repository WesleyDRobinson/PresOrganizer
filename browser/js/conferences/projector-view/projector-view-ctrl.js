
app.controller("ProjectorView", function($scope, $timeout,Fullscreen){
	var socket = io();
	$scope.fade = false;
	//console.log("projector view");

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



	//console.log('here!!!');
	socket.on("play", function(data){
		$scope.data = data;
		$scope.$digest();
	});

});
