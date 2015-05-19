app.factory('PresentationFactory', function ($http, AuthService){
	return {
		getPresentations: function(){
			return $http.get('/api/presentation/user/me')
			.then(function (res){
					return res.data;
				});
		},
		savePresentation: function(presentationId, mediaArray){
			return $http.put('/api/presentation/'+presentationId, {media: mediaArray})
			.then(function (res){
				return res.data;
			});

		}
	};
});