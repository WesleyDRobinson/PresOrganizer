app.factory('AccountFactory', function($http,AuthService){
	return {
		getAccountInformation: function(){
			return AuthService.getLoggedInUser()
				.then(function(user){
					return $http.get('/api/presentation?presenter='+user._id);
				}).then(function(res){
					return res.data;
				});
			
		}
		// saveAccount: function(presentationId, mediaArray){
		// 	return $http.put('/api/presentation/'+presentationId, {media: mediaArray})
		// 	.then(function(res){
		// 		return res.data;
		// 	});

		// }
	};
});