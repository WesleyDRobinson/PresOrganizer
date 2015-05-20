app.controller('PresentationCtrl',function ($scope, $stateParams, Session, PresentationFactory, ConferenceFactory, presentations, conferences) {
    $scope.showImages = false;
    $scope.presentations = presentations;  // resolve method
    $scope.conferenceOptions = conferences;   // resolve method
  //  $scope.localesOptions = locales  // resolve method
    $scope.currentPresentationId = null;
    
    $scope.displayPresentationMedia = function(id){  
        console.log('presentations: ', $scope.presentations);
        $scope.presentationMedia = _.find($scope.presentations, {_id: id}).media;  // !!! creates a reference
        if ($scope.presentationMedia.length === 0 ) {
            $scope.presentationMedia.push({ 
                mediaType: 'image',
                url: 'Begin adding slides to your presentation! You can delete this message once you\'ve done that!' 
            });
        }
        $scope.currentPresentationId = id;
    };

    // corresponding $scope.presentations.media array is also spliced when removeCard runs (see displayPresentationMedia)
    $scope.removeCard = function (index) {
        $scope.presentationMedia.splice(index,1);    
    };

    $scope.savePresentation = function() {
        PresentationFactory.savePresentation($scope.currentPresentationId, $scope.presentationMedia);
    };
    
    $scope.toggleImages = function(){
        $scope.showImages = $scope.showImages ? false : true;
    };
    
    $scope.sortableOptions = {
        additionPlaceholderClass: 'presentation-a-s'
    };

    // functionality for creating a new presentation 
    $scope.showCreateForm = function () {
        $scope.creating = true;
    };

    $scope.closeCreateForm = function () {
        $scope.creating = false;
        refreshPresentationObj();
    };

    function refreshPresentationObj () {   // refresh $scope.newPresentation object
        $scope.newPresentation = {
            title: '',
            presenter: null,
            media: []
        };
    }

    $scope.newPresentation = {
        title: '',
        presenter: null,
        media: []
    };

    // creating a presentation also adds the user as a presenter to a particular conference
    // creating a presentation merely adds it to the db; it does not initally contain media
    $scope.createPresentation = function (conference_id) {
        $scope.creating = false;    // to hide the input box
        return PresentationFactory.createPresentation($scope.newPresentation)
                .then(function (newPresentation) {
                    $scope.presentations.push(newPresentation);
                    refreshPresentationObj();
                    return ConferenceFactory.addConferencePresenter(conference_id, Session.user._id);    
                })
                .then(function (conference) {
                    console.log('added the user to this conference as a presenter: ', conference);
                    // should something else happen here on the ui?
                });
    };

    // functionality for removing a presentation goes here
    $scope.checkboxModel = {};   // tracks all the checkboxes

    $scope.deletePresentations = function () {
        var idsToDelete = [], deleted_ids = [];
        angular.forEach($scope.checkboxModel, function(value, checkbox_id) {
            if (value === true) {         // i.e. checkbox is checked
                this.push(checkbox_id);      // push in checkbox_id which is the presentation id
            }
        }, idsToDelete);
        PresentationFactory.deletePresentations(idsToDelete)
        .then(function (deletedPromises) {
                angular.forEach(deletedPromises, function (response) {
                    deleted_ids.push(response.data._id);
                });
            $scope.presentations = _.remove($scope.presentations, function (item) {
                return deleted_ids.indexOf(item._id) == -1;
            });
            $scope.checkboxModel = _.omit($scope.checkboxModel, deleted_ids);
        });
        // should the function also check for the relevant conference and delete the user from the presenters array? 
        // Wesley says - "no"
    };
});