app.config(function ($stateProvider) {

    $stateProvider.state('projector', {
        url: '/projector',
        templateUrl: 'js/projector/projector.html',
        controller: 'ProjectorCtrl'
    });

});

app.controller('ProjectorCtrl', function ($scope, $timeout) {
	var INTERVAL = 2000;
	var timers = [];

	$scope.slideCounter = 0;

	$scope.currentSlides = [
		{ image: 'http://www.da-files.com/contests/wechat/mon01.gif'},
		{ image: 'http://www.da-files.com/contests/wechat/mon02.gif'},
		{ image: 'http://www.da-files.com/contests/wechat/mon03.gif'}
	];

	// function getNextPresentation () {
	// 	return [
	// 		{ image: 'next presentation 1' },
	// 		{ image: 'next presentation 2' },
	// 		{ image: 'next presentation 3' }
	// 	]
	// }

    function setCurrentSlideIndex (index) {
        $scope.currentIndex = index;
    }

    function isCurrentSlideIndex (index) {
        return $scope.currentIndex === index;
    }
	
	$scope.nextSlide = function () {
		$scope.slideCounter++;
		console.log('next slide running ', $scope.slideCounter);
		// if ($scope.slideCounter > 2) {
		// 	$scope.currentSlides = getNextPresentation();
		// 	loadSlides();
		// }
        $scope.currentIndex = ($scope.currentIndex < $scope.currentSlides.length - 1) ? ++$scope.currentIndex : 0;
        timers.push($timeout($scope.nextSlide, INTERVAL));
    }

    function loadSlides () {
        timers.push($timeout($scope.nextSlide, INTERVAL));
        console.log(timers);
    }
    
    $scope.killTimer = function () {   // not working for some reason
    	console.log('kill');
    	timers.forEach($timeout.cancel);
    }

    $scope.currentIndex = 0;
    $scope.setCurrentSlideIndex = setCurrentSlideIndex;
    $scope.isCurrentSlideIndex = isCurrentSlideIndex;

    loadSlides();
    // $scope.prevSlide = function () {
    //         $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
    //     };

    // $scope.nextSlide = function () {
    //     $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
    // };
});




