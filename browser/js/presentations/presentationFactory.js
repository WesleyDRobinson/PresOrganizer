app.factory('PresentationFactory', function ($http, Session){
	return {
		createPresentation: function (presentationData) {
			presentationData.presenter = Session.user._id;
			return $http.post('/api/presentation/', presentationData)
			.then( function (res) {
				return res.data;
			});
		},
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