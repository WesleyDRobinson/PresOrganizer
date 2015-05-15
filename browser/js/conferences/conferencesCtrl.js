app.controller('ConferencesCtrl',function($q, $scope, ConferenceFactory){
	 $scope.showConferences = false;
            
    ConferenceFactory.getConferences().then(function(conferences){
        $scope.conferences = conferences;
		
    });

    $scope.timeLineOptions = {
        containment: '#timeline'
    };

    $scope.setConference = function(id){
        $scope.timeLine = _.find($scope.conferences, {_id: id}).timeline;
    	ConferenceFactory.getPresentations(id).then(function(presentations){	
            //initailize variable for presentations that can be added to the timeline
            //remove possible conference presentations if they are already existing in the timeline
            $scope.conferencePresentations = removeExistingTimeLineItems(presentations, $scope.timeLine);

            //convert these into same format as the TimeLineItems
            $scope.conferencePresentations = ConferenceFactory.convertToTimeLineItem($scope.conferencePresentations);


    	});
    	
    };

});

function removeExistingTimeLineItems(presentations, timeLine){
    return _.remove(presentations, function(presentation){

        //get the index if the presentation is in the timeLine Item
           var index =  _.findIndex(timeLine, function(timeLineItem){
            if(timeLineItem.presentation)
                return timeLineItem.presentation._id === presentation._id;
            });
           //if the timeline item is not in presentation return true and have it deleted from array
            return index === -1;
        });
}

function flatten(arr) {
  var arr2 = _.flatten(arr, true);

  return arr2.filter(function(item){
  	return item !== undefined;
    		
    	});
}