app.factory('SignUpFactory', function ($http) {
    return {
        createUser: function (formInfo) {
            return $http.post('/api/user', formInfo);
        }

    };
});