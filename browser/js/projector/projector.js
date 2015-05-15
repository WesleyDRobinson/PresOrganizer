app.config(function ($stateProvider) {

    $stateProvider.state('projector', {
        url: '/projector',
        templateUrl: 'js/projector/projector.html',
        controller: 'ProjectorCtrl', 
        resolve: ''
    });

});

app.controller('ProjectorCtrl', function ($scope, $timeout, ProjectorFactory) {
	var INTERVAL = 2000;
	var PROGRESSED_TIME = 0;
	var timers = [];

	$scope.slideCounter = 0;

    $scope.currentTimeline = ProjectorFactory.timeline();
    $scope.currentTimelineFlat = ProjectorFactory.timelineFlat($scope.currentTimeline);

    function setCurrentSlideIndex (index) {
        $scope.currentIndex = index;
    }

    function isCurrentSlideIndex (index) {
        return $scope.currentIndex === index;
    }
	
	function nextSlide () {
		console.log('next slide running ', $scope.currentIndex);
		// if ($scope.slideCounter > 2) {
		// 	$scope.currentTimelineFlat = getNextPresentation();
		// 	loadSlides();
		// }
        $scope.currentIndex = ($scope.currentIndex < $scope.currentTimelineFlat.length - 1) ? ++$scope.currentIndex : 0;
        timers.push($timeout(nextSlide, INTERVAL));
    }

    function loadSlides () {
        timers.push($timeout(nextSlide, INTERVAL));
        console.log(timers);
    }
    
    $scope.killTimer = function () {   // now working for some reason
    	console.log('kill');
    	console.log('current index: ', $scope.currentIndex);
    	timers.forEach($timeout.cancel);
    	timers = [];
    };

    $scope.restart = function () {
    	console.log('restart');
    	timers.push($timeout(nextSlide, INTERVAL));
    };

    $scope.currentIndex = 0;
    $scope.setCurrentSlideIndex = setCurrentSlideIndex;
    $scope.isCurrentSlideIndex = isCurrentSlideIndex;

    loadSlides();
});




