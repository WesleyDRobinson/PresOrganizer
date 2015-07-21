app.controller('ConferencesCtrl', function ($q, $scope, $state, $stateParams, ConferenceFactory, fetchConference, $rootScope, $timeout) {

    $scope.showConferences = false;
    $scope.timeLine = [];
    $scope.controlItems = [{title: 'Pause'}, {title: 'Loop Start'}, {title: 'Loop End'}];

    // fetchConference is a resolve method that returns an array of one element
    // this resolves before the state loads
    $scope.currentConf = fetchConference[0];
    $scope.timeLine = fetchConference[0].timeline;

    $scope.controlItemOptions = {
        //restrict move across columns. move only within column.
        dragStart: function (event) {
        },
        itemMoved: function () {
            $scope.controlItems = [{title: 'Pause'}, {title: 'Loop Start'}, {title: 'Loop End'}];
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

    $scope.saveTimeLine = function () {
        ConferenceFactory.saveTimeLine($scope.conferenceId, $scope.timeLine).then(function () {
            $rootScope.$broadcast('refresh-projector-preview');
            $scope.showTimelineSaved();
        });
    };

    // Toggle "saved" indicator for UI
    $scope.saved = false;
    $scope.showTimelineSaved = function () {
        $scope.saved = true;
        var savedTimeout = $timeout(function () {
            $scope.saved = false;
            $timeout.cancel(savedTimeout);
            savedTimeout = null;
        }, 1000);
    };

    $scope.removeCard = function (index) {
        if ($scope.timeLine[index].title === 'presentation') {
            $scope.conferencePresentations.push($scope.timeLine[index]);
        }
        $scope.timeLine.splice(index, 1);
    };

    $scope.retrievePresentations = function () {
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
    $scope.retrievePresentations();

    // this takes you back to the locales view
    $scope.goToLocales = function () {
        $state.go('locales');
    };

    // edit mode for the conf basic info
    $scope.editingInfo = false;
    $scope.editConfInfo = function () {
        $scope.editingInfo = true;
    };
    $scope.updateConfInfo = function () {
        $scope.editingInfo = false;
        $scope.currentConf.date = new Date($scope.currentConf.date);
        ConferenceFactory.putConferenceById($scope.currentConf);
    };

    // Called from child scope: ProjectorCtrl
    $scope.updateItemNumber = function (itemNumber) {
        $scope.itemNumberId = itemNumber;
    };
    $scope.isCurrentItem = function (id) {
        return id === $scope.itemNumberId;
    };
});

function removeExistingTimeLineItems(presentations, timeLine) {
    return _.remove(presentations, function (presentation) {
        //get the index if the presentation is in the timeLine Item
        var index = _.findIndex(timeLine, function (timeLineItem) {
            if (timeLineItem.presentation)
                return timeLineItem.presentation._id === presentation._id;
        });
        //if the timeline item is not in presentation return true and have it deleted from array
        return index === -1;
    });
}
