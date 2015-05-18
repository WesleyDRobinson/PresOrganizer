app.controller('NewConferenceCtrl',function ($scope, $state, $rootScope, $stateParams){
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;

    console.log($rootScope.$stateParams);
});
