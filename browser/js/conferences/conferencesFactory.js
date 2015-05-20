app.factory('ConferenceFactory', function ($q, $http, AuthService){
	return {
		getConferences: function(){
			//get the conferences that the user is managing
			return $http.get('/api/conference/user/me').then(function(res){
					return res.data;
				});
		},
		getConferenceById: function(id){
			//get the conferences by id
			return $http.get('/api/conference?_id=' + id).then(function(res){
					return res.data;
				});
		},
		getPresentations: function(conferenceId){
			return $http.get('api/conference?_id=' + conferenceId)
				.then(function (res) {
					var presenters = res.data[0].presenters;
					var promises = presenters.map(function(presenter){
						return $http.get('/api/presentation?presenter='+presenter)
						.then(function (res) {
							return res.data;
						});
					});
					
					return $q.all(promises).then(function(presentationArr){
						console.log(presentationArr);
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
		},
		removeConference: function(conferenceId){
			return $http.delete('api/conference/'+conferenceId).then(function(res){
				return res.data;
			});

		},
		newConference: function(conference){
			console.log(conference);
			return $http.post('/api/conference/', conference).then(function(res){
				return res.data;
			});
		}
	};
});

function flatten(arr) {
  var arr2 = _.flatten(arr, true);

  return arr2.filter(function(item){
  	return item !== undefined;
    		
  });
}