app.config(function ($stateProvider) {

    $stateProvider.state('locales', {
        url: '/locales',
        templateUrl: 'js/conferences/locales.html',
        controller: 'localesCtrl',
        resolve: {
            fetchLocales: function (localesFactory) {
                console.log('fetch running');
                return localesFactory.getLocales();
            }
        }
    });
});

app.controller('localesCtrl', function ($scope, $state, $stateParams, localesFactory, fetchLocales) {

	$scope.currentConf = { timeline: [] };
    $scope.locales = fetchLocales;

    // when a locale is clicked
    $scope.loadConferences = function (locale_id) {
        localesFactory.getConferences(locale_id).then(function (conferences) {
            if (conferences.length === 0) {
                $scope.conferences = [ { name: 'No conferences for this locale' } ];
            } else {
                $scope.conferences = conferences;
            }
        });
    }

    $scope.goToAdmin = function (conf_id, conf_name) {  // admin view but called "conferences"
        console.log('go to admin view');
        $state.go('conferences', { id: conf_id, name: conf_name } );
    };
});