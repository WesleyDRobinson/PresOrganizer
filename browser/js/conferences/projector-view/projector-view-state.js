app.config(function ($stateProvider) {

    $stateProvider.state('projector', {
        url: '/conferences/:id/projector',
        templateUrl: '/js/conferences/projector-view/projector.html',
        controller: 'ProjectorView'
    });

});