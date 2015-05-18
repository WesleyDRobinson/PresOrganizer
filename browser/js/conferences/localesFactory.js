app.factory('localesFactory', function ($q, $http, AuthService){
	return {

		getLocales: function () {
			return AuthService.getLoggedInUser()
				.then(function (user) {
					console.log('user is:', user);
					return $http.get('api/locale?organizers=' + user._id);
				})
				.then(function (res) {
					console.log('locales: ', res.data);
					return res.data;
				});
			},
		getConferences: function (locale_id) {
			return $http.get('api/conference?locale=' + locale_id).then(function (res) {
				return res.data;
			});
		}
 	}
});