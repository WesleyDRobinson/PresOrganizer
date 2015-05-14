app.factory('ConferenceFactory', function($q, $http,AuthService){
	return {
		getConferences: function(){
			return AuthService.getLoggedInUser()
				.then(function(user){
					return $http.get('/api/conference?presenters='+user._id);
				}).then(function(res){
					return res.data;
				});
			
		},
		getPresentations: function(conferenceId){
			return $http.get('api/conference?_id='+conferenceId)
				.then(function(res){
					var promises = [];
					var presenters = res.data[0].presenters;
					angular.forEach(presenters, function(presenter){
						var promise = $http.get('/api/presentation?presenter='+presenter)
						.then(function(res){
							return res.data;
						});
						promises.push(promise);
					});
					return $q.all(promises).then(function(presentationArr){
						
						return flatten(presentationArr);
					});
				});

		}

	};
});

function flatten(arr) {
  var arr2 = arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);

  return arr2.filter(function(item){
  	return item !== undefined;
    		
    	});
}