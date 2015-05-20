'use strict';
app.directive('uploadBox', function () {
    return {
        restrict: 'E',
        templateUrl: '/js/uploads/uploads.html',
        controller: 'UploadsCtrl'
    };
});