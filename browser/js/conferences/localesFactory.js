app.factory('localesFactory', function ($http, AuthService){
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
		getConferences: function (localeId) {
			return $http.get('api/conference?locale=' + localeId).then(function (res) {
				return res.data;
			});
		},
		removeOrganizer: function(localeId, organizerArr){
			console.log(organizerArr);
			organizerArr = organizerArr.map(function(organizer){
				return organizer._id;
			});
			return $http.put('api/locale/'+localeId,{organizers: organizerArr}).then(function(res){
				return res.data;
			});


		},
		addOrganizer: function(localeId, organizerid){
			
			// return $http.put('api/locale/'+localeId,{organizers: organizerArr}).then(function(res){
			// 	return res.data;
			// });
		}
 	};
});