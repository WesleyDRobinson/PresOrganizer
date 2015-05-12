'use strict';
app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {

    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {
           
            scope.items = [
                { label: 'Home', state: 'home', auth:true },
                { label: 'My Conferences', state: 'conferences',  auth: false },
                { label: 'My Presentation', state: 'presentations', auth: false },
                { label: 'My Account', state: 'account', auth: true }
            ];

            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };

            scope.logout = function () {
                AuthService.logout().then(function () {
                   $state.go('home');
                });
            };
            

            
            AuthService.isOrganizer().then(function(data){
            console.log('organizer data',data);
                scope.items[1].auth = data;
            });
            AuthService.isPresenter().then(function(data){
                console.log('presenter data',data);
                scope.items[2].auth = data;
            });
    
            var setUser = function () {
                AuthService.getLoggedInUser().then(function (user) {
                    scope.user = user;
                });
            };

            var removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        },
       


    };

});