app.factory('ConferenceFactory', function($http,AuthService){
	return {
		getConferences: function(){
			return AuthService.getLoggedInUser()
				.then(function(user){
					return $http.get('/api/conference?presenters='+user._id);
				}).then(function(res){
					return res.data;
				});
			
		}
	};
});