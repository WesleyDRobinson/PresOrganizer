app.config(function ($stateProvider) {

    $stateProvider.state('projector', {
        url: '/projector',
        templateUrl: '/js/conferences/projector-view/projector.html',
        controller: 'ProjectorView', 
        //resolve: ''
    });

});