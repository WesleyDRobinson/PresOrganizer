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
    $scope.loadConferences = function (locale) {
        $scope.conferencesLoaded =true;
        $scope.currentLocaleId = locale._id;
        $scope.currentLocaleName = locale.name;
        console.log('current',locale._id,"name",locale.name);

        localesFactory.getConferences(locale._id).then(function (conferences) {
                $scope.conferences = conferences;
                console.log('loaded conferences', $scope.conferences);

        });
    };
    if(localeId){
        $scope.loadConferences(localeId);
    }


    $scope.removeConference = function(conferenceId, $index){

        ConferenceFactory.removeConference(conferenceId).then(function(data){
            console.log(data);
        });
        $scope.conferences.splice($index, 1);



    };

    $scope.removeOrganizer = function(organizerId, localeId){
        var locale = _.find($scope.locales, {_id: localeId}  );
        var organizers = locale.organizers;
        _.remove(organizers, function(organizer){
            console.log(organizer._id);
            return organizerId === organizer._id;
        });
       

        localesFactory.removeOrganizer(localeId, organizers);
    };

    $scope.goToAdmin = function (conf_id, conf_name) {  // admin view but called "conferences"
        console.log('go to admin view');
        $state.go('conferences', { id: conf_id, name: conf_name } );
    };
});