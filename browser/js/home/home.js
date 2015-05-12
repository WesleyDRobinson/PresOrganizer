'use strict';
app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: function($scope, AuthService){
        	$scope.isOrganizer;
        	$scope.isPresenter;
        	if (AuthService.isAuthenticated()){
        		AuthService.isOrganizer().then(function(data){
        			$scope.isOrganizer = data;
        		});
        		AuthService.isPresenter().then(function(data){
        			$scope.isPresenter = data;
        		});
        	}	

        },


    });
});