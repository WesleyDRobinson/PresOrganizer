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
            }).success(function (data, status, headers, config) {
                console.log('data', data, 'status', status, 'headers', headers, 'config', config);
                if (typeof data === 'string'){
                    $scope.presentationMedia.push(UploadsFactory.createMediaItemFromUrl(data));
                } else if (typeof data === 'object') {
                    data.forEach(function(url) {
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
// Converted PDF comes back looking like this:
//[{"mediaType":"presentation-img","url":["https://s3.amazonaws.com/pk-usa/image1432159668616/egghead-io-directive-definition-object-cheat-sheet-1.png","https://s3.amazonaws.com/pk-usa/image1432159668616/egghead-io-directive-definition-object-cheat-sheet-2.png","https://s3.amazonaws.com/pk-usa/image1432159668616/egghead-io-directive-definition-object-cheat-sheet-3.png","https://s3.amazonaws.com/pk-usa/image1432159668616/egghead-io-directive-definition-object-cheat-sheet-4.png"]}]
//

app.factory('UploadsFactory', function () {
    return {
        createMediaItemFromUrl: function (url) {
            console.log('URL: ', url);
            return {
                mediaType: 'presentation-img',
                url      : url
            };
        }
    };
});
