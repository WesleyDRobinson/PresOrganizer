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

app.controller('localesCtrl', function ($scope, $state, $stateParams, localesFactory, fetchLocales, ConferenceFactory) {

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
    };

    $scope.removeConference = function(conferenceId, $index){
        console.log('conferences', $scope.conferences);
        console.log('index', $index);
        ConferenceFactory.removeConference(conferenceId).then(function(data){
            console.log(data);
        });
        $scope.conferences.splice($index, 1);


    };

    $scope.goToAdmin = function (conf_id, conf_name) {  // admin view but called "conferences"
        console.log('go to admin view');
        $state.go('conferences', { id: conf_id, name: conf_name } );
    };
});