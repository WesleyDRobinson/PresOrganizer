app.directive('addOrganizer', function(){
    return {
        templateUrl: 'js/conferences/addOrganizer/add-organizer.html',
        restrict: 'E',
        controller: function($scope, UserFactory, localesFactory, $state){
            UserFactory.getAllUsers().then(function(users){

                $scope.users = _.sortBy(users, 'email');
            });

            $scope.addOrganizer= function(userId){
                localesFactory.updateOrganizer( $scope.newOrganizerLocaleId,  $scope.localeOrganizerArr, userId);

                //not a perfect solution, but complicated to do this with 2 way data binding
                // need
                $state.go('locales', {localeEdit: true}, { reload: true });
            };

        }

    };
});