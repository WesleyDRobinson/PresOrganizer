app.factory('PresentationFactory', function($http,AuthService){
	return {
		getPresentations: function(){
			return AuthService.getLoggedInUser()
				.then(function(user){
					return $http.get('/api/presentation?presenter='+user._id);
				}).then(function(res){
					return res.data;
				});
			
		},
		savePresentation: function(presentationId, mediaArray){
			return $http.put('/api/presentation/'+presentationId, {media: mediaArray})
			.then(function(res){
				return res.data;
			});

		}
	};
});