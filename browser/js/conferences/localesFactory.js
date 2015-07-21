app.factory('localesFactory', function ($http, AuthService) {
    return {

        getLocales: function () {
            return AuthService.getLoggedInUser()
                .then(function (user) {

                    return $http.get('api/locale?organizers=' + user._id);
                })
                .then(function (res) {

                    return res.data;
                });
        },

        getConferences: function (locale_id) {
            return $http.get('api/conference?locale=' + locale_id).then(function (res) {
                return res.data;
            });
        },
        updateOrganizer: function (localeId, organizerArr, organizerId) {


            organizerArr = organizerArr.map(function (organizer) {
                return organizer._id;
            });

            organizerArr = _.uniq(organizerArr);

            if (organizerId)
                organizerArr.push(organizerId);
            return $http.put('api/locale/' + localeId, {organizers: organizerArr}).then(function (res) {
                return res.data;
            });

        }

    };
});