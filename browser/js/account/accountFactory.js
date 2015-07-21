app.factory('AccountFactory', function ($http, AuthService) {
    return {
        getAccountInformation: function () {

            return $http.get('/api/user/me').then(function (res) {
                return res.data;
            });

        },
        changeEmail: function (email) {
            return $http.put('/api/user/me', {email: email});

        },
        changePassword: function (password) {
            return $http.put('/api/user/changePassword', {password: password});

        }
    };
});