app.config(function ($stateProvider) {

    $stateProvider.state('locales', {
        url: '/locales',
        templateUrl: 'js/conferences/locales.html',
        controller: 'localesCtrl',
        params: {localeId: null},
        resolve: {
            fetchLocales: function (localesFactory) {
                console.log('fetch running');
                return localesFactory.getLocales();
            }
        }
    });
});

app.controller('localesCtrl', function ($scope, $state, $stateParams, Session, localesFactory, fetchLocales, ConferenceFactory) {
    
	$scope.currentConf = { timeline: [] };
    $scope.locales = fetchLocales;
    var localeId = $stateParams.localeId;
    $scope.myName = Session.user.name;


    $scope.localeEdit = false;
    $scope.toggleEdit = function(){
        $scope.localeEdit = !$scope.localeEdit;
    };
    // when a locale is clicked
    $scope.loadConferences = function (locale_id) {
        $scope.conferencesLoaded =true;

        localesFactory.getConferences(locale_id).then(function (conferences) {
                $scope.conferences = conferences;

        });
    };
    if(localeId){
        $scope.loadConferences(localeId);
    }


    $scope.removeConference = function(conferenceId, $index){
        console.log('conferences', $scope.conferences);
        console.log('index', $index);
        ConferenceFactory.removeConference(conferenceId).then(function(data){
            console.log(data);
        });
        $scope.conferences.splice($index, 1);


    };

    $scope.removeOrganizer = function(organizerId, localeId){
        localesFactory.removeOrganizer(organizerId,localeId);
    };

    $scope.goToAdmin = function (conf_id, conf_name) {  // admin view but called "conferences"
        console.log('go to admin view');
        $state.go('conferences', { id: conf_id, name: conf_name } );
    };
});