'use strict';

var app = angular.module('FullstackGeneratedApp', ['ui.sortable','ui.router', 'fsaPreBuilt', 'ngAnimate', 'FBAngular']);

app.config(function ($urlRouterProvider, $locationProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');
});

// This app.run is for controlling access to specific states.
app.run(function ($rootScope, AuthService, $state) {

    // The given state requires an authenticated user.
    var destinationStateRequiresAuth = function (state) {
        return state.data && state.data.authenticate;
    };

    // $stateChangeStart is an event fired
    // whenever the process of changing a state begins.
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        if (!destinationStateRequiresAuth(toState)) {
            // The destination state does not require authentication
            // Short circuit with return.
            return;
        }

        if (AuthService.isAuthenticated()) {
            // The user is authenticated.
            // Short circuit with return.
            return;
        }

        // Cancel navigating to new state.
        event.preventDefault();

        AuthService.getLoggedInUser().then(function (user) {
            // If a user is retrieved, then renavigate to the destination
            // (the second time, AuthService.isAuthenticated() will work)
            // otherwise, if no user is logged in, go to "login" state.
            if (user) {
                $state.go(toState.name, toParams);
            } else {
                $state.go('login');
            }
        }); $scope.isFullscreen = false;
    $scope.fullscreenBtnText = "Enter Fullscreen";
   //  $scope.goFullscreen = function () {

   //      if (Fullscreen.isEnabled()) {
   //          Fullscreen.cancel();
   //          $scope.isFullscreen = false;
   //          $scope.fullscreenBtnText = "Enter Fullscreen";
   //      } 
   //      else {
   //          Fullscreen.all();
   //          $scope.isFullscreen = true;
   //          $scope.fullscreenBtnText = "Exit Fullscreen";
   //      }

   // };

    $scope.goFullscreen = function() {
        Fullscreen.toggleAll();
    };

    Fullscreen.$on('FBFullscreen.change', function() {

        if (Fullscreen.isEnabled()) {
            $scope.isFullscreen = true;
            $scope.fullscreenBtnText = "Exit Fullscreen";
        }
        else {
            $scope.isFullscreen = false;
            $scope.fullscreenBtnText = "Enter Fullscreen";

        } 

    });

    });

});

// for toggling full screen mode
app.controller('FullscreenCtrl', function($scope, $rootScope, Fullscreen) {
    $scope.isFullscreen = false;
    $scope.fullscreenBtnText = "Enter Fullscreen";
   //  $scope.goFullscreen = function () {

   //      if (Fullscreen.isEnabled()) {
   //          Fullscreen.cancel();
   //          $scope.isFullscreen = false;
   //          $scope.fullscreenBtnText = "Enter Fullscreen";
   //      } 
   //      else {
   //          Fullscreen.all();
   //          $scope.isFullscreen = true;
   //          $scope.fullscreenBtnText = "Exit Fullscreen";
   //      }

   // };

    $scope.goFullscreen = function() {
        Fullscreen.toggleAll();
    };

    Fullscreen.$on('FBFullscreen.change', function() {

        if (Fullscreen.isEnabled()) {
            $scope.isFullscreen = true;
            $scope.fullscreenBtnText = "Exit Fullscreen";
        }
        else {
            $scope.isFullscreen = false;
            $scope.fullscreenBtnText = "Enter Fullscreen";
            

        } 

    });


});