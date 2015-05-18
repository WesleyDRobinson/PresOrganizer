'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('uploads', {
        url: '/uploads',
        templateUrl: 'js/uploads/uploads.html'
    });
});

app.directive('file', function() {
    return {
        restrict: 'AE',
        scope: {
            file: '@'
        },
        link: function(scope, el, attrs){
            el.bind('change', function(event){
                var files = event.target.files;
                var file = files[0];
                scope.file = file;
                scope.$parent.file = file;
                scope.$apply();
            });
        }
    };
});

app.controller('UploadsCtrl', function ($scope) {
    $scope.creds = {
        bucket: 'pk-usa',
        access_key: 'AKIAJWM3ZW7CIETGJ6AQ',
        secret_key: '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'
    };

    AWS.config.update({
        "accessKeyId"    : $scope.creds.access_key,
        "secretAccessKey": $scope.creds.secret_key
    });
    AWS.config.region = 'us-east-1';

    $scope.upload = function () {

        var bucket = new AWS.S3({ params: { Bucket: $scope.creds.bucket } });

        if($scope.file) {
            var params = { Key: $scope.file.name, ContentType: $scope.file.type, Body: $scope.file, ServerSideEncryption: 'AES256' };

            bucket.putObject(params, function(err, data) {
                if(err) {
                    // There Was An Error With Your S3 Config
                    alert(err.message);
                    return false;
                }
                else {
                    // Success!
                    console.log("DATA: ", data);
                    alert('Upload Done');
                }
            })
                .on('httpUploadProgress',function(progress) {
                    // Log Progress Information
                    $scope.uploadProgress = (progress.loaded / progress.total * 100);

                });
        }
        else {
            // No File Selected
            alert('No File Selected');
        }


    };

    $scope.getObject = function (name) {
        console.log("Fetching object!");
        var s3 = new AWS.S3();
        var params = {Bucket: 'pk-usa', Key: name};
        $scope.imgUrl = s3.getSignedUrl('getObject', params);

        //s3.getObject(params, function (err, data) {
        //    console.log("You went to s3 and back");
        //    if (err) console.log(err, err.stack); // an error occurred
        //    else     {
        //        console.log("DATA", parsejson(data));
        //        $scope.s3object = data;
        //        $scope.$digest();
        //    }           // successful response
        //});

    };


});

//Access Key ID:
//    AKIAJWM3ZW7CIETGJ6AQ
//Secret Access Key:
//    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