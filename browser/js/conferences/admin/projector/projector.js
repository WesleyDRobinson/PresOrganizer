app.controller('ProjectorCtrl', function ($scope, $timeout, $stateParams, ProjectorModeFactory) {
    var INTERVAL = 2000;
    var TIMER;
    var PAUSED = false;
    var socket = io();

    $scope.currentIndex = 0;
    $scope.isCurrentSlideIndex = isCurrentSlideIndex;
    $scope.isNextSlideIndex = isNextSlideIndex;
    $scope.setCurrentSlideIndex = setCurrentSlideIndex;

    $scope.currentTimelineFlat = ProjectorModeFactory.timelineFlat($scope.timeLine);

    $scope.$on('refresh-projector-preview', function () {
        $scope.currentTimelineFlat = ProjectorModeFactory.timelineFlat($scope.timeLine);
        $scope.isCurrentSlideIndex();
        $scope.isNextSlideIndex();
    });

    function setCurrentSlideIndex(index) {
        $scope.currentIndex = index;
    }

    function isCurrentSlideIndex(index) {
        if ($scope.currentIndex === index) {
            socket.emit('play', {index: index, url: $scope.currentTimelineFlat[index].url, id: $stateParams.id});
        }

        return $scope.currentIndex === index;
    }

    function isNextSlideIndex(index) {
        if ($scope.currentIndex + 1 >= $scope.currentTimelineFlat.length) {
            return 0 === index;
        }
        else if ($scope.currentTimelineFlat[$scope.currentIndex + 1].title && $scope.currentTimelineFlat[$scope.currentIndex + 1].title === "Pause") {
            return $scope.currentIndex + 2 === index;
        }
        else return $scope.currentIndex + 1 === index;
    }

    function nextSlide() {
        // update the item number 
        if ($scope.currentTimelineFlat[$scope.currentIndex].itemNumber) {
            $scope.updateItemNumber($scope.currentTimelineFlat[$scope.currentIndex].itemNumber);
            console.log($scope.currentTimelineFlat[$scope.currentIndex].itemNumber);
        }

        $scope.currentIndex = ($scope.currentIndex < $scope.currentTimelineFlat.length - 1) ? ++$scope.currentIndex : 0;

        var next = ($scope.currentIndex < $scope.currentTimelineFlat.length - 1) ? $scope.currentIndex + 1 : 0;

        if ($scope.currentTimelineFlat[$scope.currentIndex + 1].title && $scope.currentTimelineFlat[$scope.currentIndex + 1].title === "Pause") {


            // pause
            PAUSED = true;
            $scope.killTimer();

        } else {
            loadSlides();
        }
    }

    function loadSlides() {
        if (TIMER) $timeout.cancel(TIMER);
        TIMER = $timeout(nextSlide, INTERVAL);
        $scope.playing = true;
        $scope.playButtonText = "Pause";
    }

    $scope.loadSlides = loadSlides;

    $scope.killTimer = function () {   // now working for some reason
        if (TIMER) {
            $timeout.cancel(TIMER);
            TIMER = null;
            $scope.playing = false;
            $scope.playButtonText = "Play";

        }
    };

    $scope.restart = function () {   // must hide when presentation is playing
        if (PAUSED) {
            $scope.currentIndex += 2;    // must consider edge case (phase 2)
            PAUSED = false;
        }
        loadSlides();
    };

    // Play button
    $scope.playing = false;
    $scope.playButtonText = 'Play';
    $scope.playToggle = function () {
        if (!$scope.playing) {
            if (!PAUSED) {
                loadSlides();
            }
            else $scope.restart();
        }
        else {
            $scope.killTimer();
        }
    };
});




