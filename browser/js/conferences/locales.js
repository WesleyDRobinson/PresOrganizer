app.config(function ($stateProvider) {

    $stateProvider.state('locales', {
        url: '/locales',
        templateUrl: 'js/conferences/locales.html',
        controller: 'localesCtrl',
        params: {localeId: null, localeEdit: null},
        resolve: {
            fetchLocales: function (localesFactory) {
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


    $scope.localeEdit = $stateParams.localeEdit || false;
    $scope.toggleEdit = function(){
        $scope.localeEdit = !$scope.localeEdit;
    };
    // when a locale is clicked
    $scope.loadConferences = function (locale) {
        $scope.addOrganizer = false;
        $scope.addConference = false;
        $scope.conferencesLoaded = true;
        $scope.currentLocaleId = locale._id;
        $scope.currentLocaleName = locale.name;

        localesFactory.getConferences(locale._id).then(function (conferences) {
                $scope.conferences = conferences;


        });
    };
    if(localeId){
        //get locale by ID if a localeID has been passed to state as param
        var locale = _.find($scope.locales, function(locale){
            return locale._id == localeId;
        })

        //load up the conference
        $scope.loadConferences(locale);
    }

    $scope.newOrganizer = function(locale, index){
        $scope.addOrganizer = true;
        $scope.addConference = false;
        $scope.newOrganizerLocale = locale.name;
        $scope.newOrganizerLocaleId = locale._id;
        $scope.localeOrganizerArr = locale.organizers;
    };
    $scope.removeConference = function(conferenceId, $index){

        ConferenceFactory.removeConference(conferenceId);
        $scope.conferences.splice($index, 1);

    };

    $scope.addConference = false;
    $scope.loadNewConferenceForm = function(locale) {
        $scope.addConference = true;
        $scope.conferenceToAdd = {};

        $scope.currentLocaleId = locale._id;
        $scope.currentLocaleName = locale.name;
    };

    $scope.createConference = function(conference, isValid) {
        console.log(conference);
        console.log(isValid);

        conference.locale = $scope.currentLocaleId;

        if(isValid) {
            ConferenceFactory.newConference(conference).then(function(data){
                $scope.addConference = false;
                $state.go('locales',{localeId: $scope.currentLocaleId});
            });

        }
    };


    $scope.removeOrganizer = function(organizerId, localeId){
        var locale = _.find($scope.locales, {_id: localeId}  );
        var organizers = locale.organizers;
        _.remove(organizers, function(organizer){

            return organizerId === organizer._id;
        });
       

        localesFactory.updateOrganizer(localeId, organizers);
    };

    $scope.goToAdmin = function (conf_id, conf_name) {  // admin view but called "conferences"

        $state.go('conferences', { id: conf_id, name: conf_name } );
    };
});