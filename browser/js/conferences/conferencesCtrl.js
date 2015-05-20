app.controller('ConferencesCtrl',function ($q, $scope, $state, $stateParams, ConferenceFactory, fetchConference, $rootScope, $timeout){

	$scope.showConferences = false;
    $scope.timeLine = [];
    $scope.controlItems = [{title:'pause'},{title:'loopStart'},{title:'loopEnd'}];

    // fetchConference is a resolve method that returns an array of one element
    // this resolves before the state loads
    $scope.currentConf = fetchConference[0];   
    $scope.timeLine = fetchConference[0].timeline;

    $scope.controlItemOptions = {
        //restrict move across columns. move only within column.
        /*accept: function (sourceItemHandleScope, destSortableScope) {
         return sourceItemHandleScope.itemScope.sortableScope.$id !== destSortableScope.$id;
         },*/
        dragStart: function(event){
        },
        itemMoved: function (event) {
            $scope.controlItems = [{title:'pause'},{title:'loopStart'},{title:'loopEnd'}];
        },
        orderChanged: function (event) {  
        },
        accept: function (sourceItemHandleScope, destSortableScope) {
            return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
        },
        containment: '#board'
    };

    $scope.conferenceOptions = {
        accept: function (sourceItemHandleScope, destSortableScope) {
            return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
        }
    };

    $scope.saveTimeLine = function(){
        console.log("save");
        ConferenceFactory.saveTimeLine($scope.conferenceId, $scope.timeLine);
        // async issue!
        $rootScope.$broadcast('refresh-projector-preview');
        $scope.showTimelineSaved();
    };

    $scope.saved = false;
    $scope.showTimelineSaved = function() {
        console.log("disk");
        $scope.saved = true;
        var savedTimeout = $timeout(function() {
            console.log("setTimeout");
            $scope.saved = false;
            $timeout.cancel(savedTimeout);
            savedTimeout = null;
        }, 1000);
    };

    $scope.removeCard = function(index){
        //console.log("deleting card at",$scope.timeLine[index]);

        if($scope.timeLine[index].title==='presentation'){
            $scope.conferencePresentations.push($scope.timeLine[index]);
        }
        $scope.timeLine.splice(index,1);
    };

    $scope.retrievePresentations = function(id){
        $scope.timeLine = $scope.currentConf.timeline;
        $scope.conferenceId = $scope.currentConf._id;
    	ConferenceFactory.getPresentations($scope.currentConf._id).then(function (presentations) {	
            //initailize variable for presentations that can be added to the timeline
            //remove possible conference presentations if they are already existing in the timeline
            $scope.conferencePresentations = removeExistingTimeLineItems(presentations, $scope.currentConf.timeline);
            //convert these into same format as the TimeLineItems
            $scope.conferencePresentations = ConferenceFactory.convertToTimeLineItem($scope.conferencePresentations);
    	});
    };
    
    // runs when state loads (is there a better way...?)
    $scope.retrievePresentations($stateParams.id);

    // this takes you back to the locales view
    $scope.goToLocales = function () {
        $state.go('locales');
    };  

    // edit mode for the conf basic info
    $scope.editingInfo = false;
    $scope.editConfInfo = function() {
        $scope.editingInfo = true;
    };
    $scope.updateConfInfo = function() {
        $scope.editingInfo = false;

        console.log("1", $scope.currentConf.date);
        $scope.currentConf.date = new Date($scope.currentConf.date);
        console.log("2", $scope.currentConf.date);

        ConferenceFactory.putConferenceById($scope.currentConf);
    };
});

function removeExistingTimeLineItems(presentations, timeLine){
    // console.log("PRESENTATIONS");
    // presentations.forEach(function(presentation){console.log(presentation.title)});
    // console.log("TIMELINE");
    // timeLine.forEach(function(timeLine){if(timeLine.presentation)console.log(timeLine.presentation.title)});
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