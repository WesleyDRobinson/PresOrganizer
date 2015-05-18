app.config(function ($stateProvider) {

    $stateProvider.state('conferences', {
        url: '/conferences/:id/admin/:name', 
        templateUrl: 'js/conferences/conferences.html',
        controller: 'ConferencesCtrl'
    });

    $stateProvider.state('locales', {
        url: 'locales',
        templateUrl: 'js/conferences/locales.html',
        controller: 'localesCtrl'
    });
});
