app.factory('ConferenceFactory', function($q, $http,AuthService){
	return {
		getConferences: function(){
			return AuthService.getLoggedInUser()
				.then(function(user){
					return $http.get('/api/conference?presenters='+user._id);
				}).then(function(res){
					console.log(res.data);
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

		},
		convertToTimeLineItem: function(presentations){
			return presentations.map(function(presentation){
				return {title: 'presentation', presentation: presentation};

			});


		},
		saveTimeLine: function(conferenceId, timeLine){

			var newTimeLineObj = timeLine.map(function(timeLineItem){
				var newTimeLineItem = {title: timeLineItem.title};
				if(timeLineItem.presentation){
					newTimeLineItem.presentation = timeLineItem.presentation._id;

				}
				return newTimeLineItem;

			});

			return $http.put('/api/conference/'+conferenceId, {timeline: newTimeLineObj})
			.then(function(res){
				return res.data;
			});			

		
		}

	};
});

function flatten(arr) {
  //flatten multidimensional array into single array
  var arr2 = arr.reduce(function (flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
  }, []);

  //remove undefined spaces in array
  return arr2.filter(function(item){
  	return item !== undefined;
    		
    	});
}