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
		updateOrganizer: function(localeId, organizerArr, organizerId){


			organizerArr = organizerArr.map(function(organizer){
				return organizer._id;
			});

            organizerArr =  _.uniq(organizerArr);
            console.log('after uniq',organizerArr);
            if(organizerId)
                organizerArr.push(organizerId);
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