app.controller('ProjectorCtrl', function ($scope, $timeout,$stateParams, ProjectorModeFactory) {
	var INTERVAL = 2000;
	var TIMER;
    var PAUSED = false;
    var socket = io();

    $scope.currentIndex = 0;
    $scope.setCurrentSlideIndex = setCurrentSlideIndex;
    $scope.isCurrentSlideIndex = isCurrentSlideIndex;
    $scope.isNextSlideIndex = isNextSlideIndex;

    $scope.currentTimelineFlat = ProjectorModeFactory.timelineFlat($scope.timeLine);
    
    $scope.$on('refresh-projector-preview', function() {
        console.log("1", $scope.currentTimelineFlat);
        $scope.currentTimelineFlat = ProjectorModeFactory.timelineFlat($scope.timeLine);
        console.log("2", $scope.currentTimelineFlat);
        loadSlides();
    });


    // might not be used currently
    function setCurrentSlideIndex (index) {
        $scope.currentIndex = index;
    }

    function isCurrentSlideIndex (index) {
        if ($scope.currentIndex === index) {
            socket.emit('play', {index: index, url: $scope.currentTimelineFlat[index].url, id: $stateParams.id});
        }

        return $scope.currentIndex === index;
    }

    function isNextSlideIndex (index) {
        if ($scope.currentIndex + 1 >= $scope.currentTimelineFlat.length){
            return 0 === index;
        }
        else if ($scope.currentTimelineFlat[$scope.currentIndex + 1] === "pause") {
            return $scope.currentIndex + 2 === index;  
        }
        else return $scope.currentIndex + 1 === index;  
    }

	function nextSlide () {
        $scope.currentIndex = ($scope.currentIndex < $scope.currentTimelineFlat.length - 1) ? ++$scope.currentIndex : 0;
        var next = ($scope.currentIndex < $scope.currentTimelineFlat.length - 1) ? $scope.currentIndex + 1 : 0;

        if ($scope.currentTimelineFlat[next] === "pause") {
            PAUSED = true;
            $scope.killTimer();
        } else {
            loadSlides();
        }
    }

    function loadSlides () {
        if (TIMER) $timeout.cancel(TIMER);
        TIMER = $timeout(nextSlide, INTERVAL);
        $scope.playing = true;
        $scope.playButtonText = "Pause";
    }

    $scope.loadSlides = loadSlides;
    
    $scope.killTimer = function () {   // now working for some reason
        if (TIMER) { 
            //console.log('kill');
            $timeout.cancel(TIMER);
            TIMER = null;
            $scope.playing = false;
            $scope.playButtonText = "Play";
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

    // Play button
    $scope.playing = false;
    $scope.playButtonText = 'Play';
    $scope.playToggle = function() {
        if(!$scope.playing) {
            if(!PAUSED) {
                loadSlides();
            }
            else $scope.restart();
        }
        else {
            $scope.killTimer();
        }
    };
});




