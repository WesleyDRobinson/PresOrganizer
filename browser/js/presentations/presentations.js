app.config(function ($stateProvider) {

    $stateProvider.state('presentations', {
        url: '/presentations',
        templateUrl: 'js/presentations/presentations.html',
        controller: 'PresentationCtrl',
        resolve: {
            getPresentations: function(PresentationFactory){
                return PresentationFactory.getPresentations();
            }
        }
    });

});

