'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('uploads', {
        url: '/uploads',
        templateUrl: 'js/uploads/uploads.html'
    });
});

app.controller('UploadsCtrl', function ($scope, Upload, UploadsFactory) {

    $scope.acceptedFiles = [];
    $scope.loadingAndConverting = false;

    $scope.uploadThis = function (acceptedFiles) {

        acceptedFiles.forEach(function (file) {
            $scope.loadingAndConverting = true;
            // Send files to server
            Upload.upload({
                url: 'api/upload',
                file: file
            }).success(function (data, status, headers, config) {
                console.log('data', data, 'status', status, 'headers', headers, 'config', config);
                if (typeof data === 'string') {
                    $scope.presentationMedia.push(UploadsFactory.createMediaItemFromUrl(data));
                } else if (typeof data === 'object') {
                    data.forEach(function (url) {
                        $scope.presentationMedia.push(UploadsFactory.createMediaItemFromUrl(url));
                    });
                } else {
                    alert("Something went pretty wrong here." +
                        "Please wait a few minutes and try again." +
                        "Hopefully time solves the problem!")
                }
                $scope.loadingAndConverting = false;
            });
        });

    };

});

app.factory('UploadsFactory', function () {
    return {
        createMediaItemFromUrl: function (url) {
            console.log('URL: ', url);
            return {
                mediaType: 'presentation-img',
                url: url
            };
        }
    };
});
