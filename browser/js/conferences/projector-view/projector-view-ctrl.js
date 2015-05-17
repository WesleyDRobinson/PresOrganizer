app.controller("ProjectorView", function($scope, ProjectorCtrl){
	$scope.mouse = function() {
		console.log("hi");
	};
	ProjectorCtrl.loadSlides();
});