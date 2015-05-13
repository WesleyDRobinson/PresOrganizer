app.config(function ($stateProvider) {

    $stateProvider.state('presentations', {
        url: '/presentations',
        templateUrl: 'js/presentations/presentations.html',
        controller: function ($scope, PresentationFactory) {
            $scope.showImages = false;
            
            PresentationFactory.getPresentations().then(function(presentations){
                $scope.presentations = presentations;
            });
            $scope.toggleImages = function(){
                $scope.showImages = $scope.showImages ? false : true;
            };
            
        },

        // // The following data.authenticate is read by an event listener
        // // that controls access to this state. Refer to app.js.
        // data: {
        //     authenticate: true
        // }
    });

});

