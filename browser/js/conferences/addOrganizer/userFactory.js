app.factory('UserFactory', function ($http) {
    return {
        getAllUsers: function () {
            return $http.get('/api/user').then(function (res) {
                return res.data;
            })
        }
    }
});