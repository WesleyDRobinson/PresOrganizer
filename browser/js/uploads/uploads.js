'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('uploads', {
        url        : '/uploads',
        templateUrl: 'js/uploads/uploads.html'
    });
});

app.controller('UploadsCtrl', function ($scope, Upload) {

    $scope.acceptedFiles = [];

    $scope.uploadThis = function (acceptedFiles) {

        acceptedFiles.forEach(function (file) {
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
                console.log('data', data, 'status', status,'headers', headers, 'config', config);
                $scope.serverResponse = data;
                $scope.log = 'file ' + config.file.name + 'uploaded. Response: ' + JSON.stringify(data) + '\n' + $scope.log;
            });
        });

    };

});
