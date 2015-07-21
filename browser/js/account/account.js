app.config(function ($stateProvider) {

    $stateProvider.state('account', {
        url: '/account',
        templateUrl: 'js/account/account.html',
        controller: 'AccountCtrl',
        resolve: {
            accountInfo: function (AccountFactory) {
                return AccountFactory.getAccountInformation();
            }
        }
    });

});

