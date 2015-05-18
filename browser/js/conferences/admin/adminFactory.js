app.factory('AdminFactory', function ($http) {
	return {
		fetchConference: function (conf_id) {
			return $http.get('api/conference?_id=' + conf_id)
					.then(function (res) {
						return res.data;
					});
		},
		getPresentations: function(conferenceId){
			return $http.get('api/conference?_id='+conferenceId)
				.then(function(res){
					var presenters = res.data[0].presenters;

					var promises = presenters.map(function(presenter){
						return $http.get('/api/presentation?presenter='+presenter)
						.then(function(res){
							return res.data;
						});
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
  var arr2 = _.flatten(arr, true);

  return arr2.filter(function(item){
  	return item !== undefined;
    		
  });
}