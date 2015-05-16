app.config(function ($stateProvider) {

    $stateProvider.state('projector', {
        url: '/projector',
        templateUrl: '/js/conferences/admin/projector/projector.html',
        controller: 'ProjectorCtrl', 
        resolve: ''
    });

});

app.controller('ProjectorCtrl', function ($scope, $timeout, ProjectorModeFactory) {
	var INTERVAL = 2000;
	var PROGRESSED_TIME = 0;
	var TIMER;
    var PAUSED = false;

    $scope.currentTimeline = ProjectorModeFactory.timeline();
    $scope.currentTimelineFlat = ProjectorModeFactory.timelineFlat($scope.currentTimeline);

    function setCurrentSlideIndex (index) {
        $scope.currentIndex = index;
    }

    function isCurrentSlideIndex (index) {
        return $scope.currentIndex === index;
    }
	
    // still working on this
	function nextSlide () {
        $scope.currentIndex = ($scope.currentIndex < $scope.currentTimelineFlat.length - 1) ? ++$scope.currentIndex : 0;
        var next = ($scope.currentIndex < $scope.currentTimelineFlat.length - 1) ? $scope.currentIndex + 1 : 0;

        if ($scope.currentTimelineFlat[next].mediaType === "pause") {
            //console.log('currently paused');
            PAUSED = true;
            $scope.killTimer();
        } else {
            loadSlides();
        }
    }

    function loadSlides () {
        if (TIMER) $timeout.cancel(TIMER);
        TIMER = $timeout(nextSlide, INTERVAL);
        //console.log(timers);
    }
    
    $scope.killTimer = function () {   // now working for some reason
        if (TIMER) { 
            //console.log('kill');
            $timeout.cancel(TIMER);
            TIMER = null;
        }
    };

    $scope.restart = function () {   // must hide when presentation is playing
    	//console.log('restart');
        if (PAUSED) {
            $scope.currentIndex += 2;    // must consider edge case (phase 2)
            PAUSED = false;
        }
    	loadSlides();
    };

    $scope.currentIndex = 0;
    $scope.setCurrentSlideIndex = setCurrentSlideIndex;
    $scope.isCurrentSlideIndex = isCurrentSlideIndex;
    //console.log('current index: ', $scope.currentIndex);
    loadSlides();
});




