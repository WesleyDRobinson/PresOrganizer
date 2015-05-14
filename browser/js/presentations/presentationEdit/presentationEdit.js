app.config(function ($stateProvider) {

    $stateProvider.state('presentation_edit', {
        url: '/presentationEdit',
        templateUrl: 'js/presentations/presentationEdit/presentationEdit.html',
        controller: 'PresentationCtrl'
    });

});

