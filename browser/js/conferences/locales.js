app.controller('localesCtrl', function ($scope, $state, $stateParams, localesFactory) {

	$scope.currentConf = { timeline: [] };

    // should be in a resolve
    localesFactory.getLocales().then(function (locales) {
        $scope.locales = locales;
    });

    // when a locale is clicked
    $scope.loadConferences = function (locale_id) {
        localesFactory.getConferences(locale_id).then(function (conferences) {
            if (conferences.length === 0) {
                $scope.conferences = [ { name: 'No conferences' } ];
            } else {
                $scope.conferences = conferences;
            }
        });
    }

    $scope.goToAdmin = function (conf_id, conf_name) {
        console.log('go to admin view');
        $state.go('conferences', { id: conf_id, name: conf_name } );
    };
});