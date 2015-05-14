app.controller('ConferencesCtrl',function($q, $scope, ConferenceFactory){
	 $scope.showConferences = false;
            
    ConferenceFactory.getConferences().then(function(conferences){
        $scope.conferences = conferences;
		
    });

    $scope.setConference = function(id){

    	ConferenceFactory.getPresentations(id).then(function(presentations){
    		$scope.conferencePresentations = presentations;
    	});
    };

  //   $scope.getConference = function(){
  //   	var promises = [];
		// angular.forEach($scope.conferences, function(conference){
		// 	var promise = ConferenceFactory.getPresentations(conference._id);
		// 	promises.push(promise);
		// 	// var usedTimeLineItems = conference.timeline.map(function(timeLineItems){
		// 	// 	//if we have a presentation
		// 	// 	if(timeLineItems.presentation)
		// 	// 		return timeLineItems.presentation;
		// 	// 	//otherwise we have a transport item
		// 	// 	else
		// 	// 		return timeLineItems.title;
		// 	// });


		// 	// var promise = ConferenceFactory.getPresentations();

		// 	// var promise = ConferenceFactory.getPresentations
		// 	// .then()
		// });
		// return $q.all(promises);
  //   }).then(function(all){
  //   	var arr = flatten(all);

  //   	console.log(arr);
  //   }
    
    $scope.toggleConferences = function(){
        $scope.showConferences = $scope.showConferences ? false : true;
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