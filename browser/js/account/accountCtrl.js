app.controller('AccountCtrl', function ($scope, accountInfo, AccountFactory) {
    $scope.accountInfo = accountInfo;
    $scope.email;
    $scope.password;
    $scope.submitPassword = function () {
        if ($scope.password) {
            AccountFactory.changePassword($scope.password);
            $scope.password = undefined;
        }

    };
    $scope.submitEmail = function () {
        if ($scope.email) {
            AccountFactory.changeEmail($scope.email);
            $scope.accountInfo.email = $scope.email;
            $scope.email = undefined;
        }
    };
});