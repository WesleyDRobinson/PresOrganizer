app.config(function ($stateProvider) {

    $stateProvider.state('conferences', {
        url: '/conferences',
        templateUrl: 'js/conferences/conferences.html',
        controller: function ($scope, ConferenceFactory) {
            $scope.showImages = false;
            
            ConferenceFactory.getConferences().then(function(conferences){
                $scope.conferences = conferences;
            });
            $scope.toggleConferences = function(){
                $scope.showConferences = $scope.showConferences ? false : true;
            };
            
        },

        // // The following data.authenticate is read by an event listener
        // // that controls access to this state. Refer to app.js.
        // data: {
        //     authenticate: true
        // }
    });

});

