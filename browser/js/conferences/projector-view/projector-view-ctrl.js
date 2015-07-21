app.controller("ProjectorView", function ($scope, $timeout, Fullscreen, $stateParams) {
    var socket = io();
    $scope.fade = false;

    socket.on('connect', function () {
        socket.emit('join projection', {id: $stateParams.id});
    });

    Fullscreen.$on('FBFullscreen.change', function () {
        $scope.fade = Fullscreen.isEnabled() ? true : false;
    });

    socket.on("play", function (data) {
        console.log('receiving play info', data);
        $scope.data = data;
        $scope.$digest();
    });

});
