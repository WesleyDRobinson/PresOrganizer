// TODO -- for later version
// app.controller('NewConferenceCtrl',function ($scope, $state, $rootScope, $stateParams, ConferenceFactory){
//     $rootScope.$state = $state;
//     $rootScope.$stateParams = $stateParams;
//     $scope.localeId = $stateParams.localeId;
//     $scope.localeName = $stateParams.localeName;
  
//     //if no localeID has been passed to Ctrl via state params
//     //go back to locales page!
//     if(!$scope.localeId){
//         $state.go('locales');
//     }

//     var conference = $scope.conference = {};
//     conference.locale = $scope.localeId;


//     $scope.createConference = function(conference, isValid) {
//         if(isValid) {
//             ConferenceFactory.newConference(conference).then(function(data){

//                 $state.go('locales',{localeId: $scope.localeId});
//             });

//         }
//     };
// });
