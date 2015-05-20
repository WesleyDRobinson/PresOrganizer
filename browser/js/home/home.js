'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html'
    });
});

app.controller('HomeCtrl', function ($scope, AuthService) {

    AuthService.getLoggedInUser().then(function (user) {
        $scope.user = user;
    });

});