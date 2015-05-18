app.config(function ($stateProvider) {

    $stateProvider.state('sign-up', {
        url: '/signup',
        templateUrl: 'js/sign-up/sign-up.html',
        controller: 'SignUpCtrl'
    });

});

app.controller('SignUpCtrl', function ($scope, SignUpFactory, $state) {

    $scope.formInfo = {};

    $scope.createUser = function () {     
        SignUpFactory.createUser($scope.formInfo);
        $scope.formInfo = {};

    };

});