app.config(function ($stateProvider) {

    $stateProvider.state('sign-up', {
        url: '/sign-up',
        templateUrl: 'js/sign-up/sign-up.html',
        controller: 'SignUpCtrl'
    });

});

app.controller('SignUpCtrl', function ($scope, SignUpFactory, $state) {

    $scope.createUser = function () {      

    };

});