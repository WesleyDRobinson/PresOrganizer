app.config(function ($stateProvider) {

    $stateProvider.state('conferences', {
        url: '/conferences/:id/admin/:name', 
        templateUrl: 'js/conferences/conferences.html',
        controller: 'ConferencesCtrl'
    });
});
