'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('uploads', {
        url        : '/uploads',
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
                url : 'api/upload',
                file: file
                //fields can be any key:value we would like to send along with it.
                // Could be helpful?
                //fields: {type: "YER TYPE HERE"}
            }).progress(function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            }).success(function (data, status, headers, config) {
                console.log('data', data, 'status', status, 'headers', headers, 'config', config);
                $scope.newMedia.push(UploadsFactory.createMediaItemFromUrl(data));
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
                url      : url
            }
        }
    }
});
