app.config(function ($stateProvider) {

    $stateProvider.state('conferences', {
        url: '/conferences/:id/admin', 
        templateUrl: 'js/conferences/conferences.html',
        controller: 'ConferencesCtrl',
        resolve: {
            fetchConference: function (ConferenceFactory, $stateParams) {
                return ConferenceFactory.getConferenceById($stateParams.id);
            }      
        }
    });
});
