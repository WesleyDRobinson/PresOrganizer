app.controller('PresentationCtrl',function ($scope, $stateParams, Session, PresentationFactory, ConferenceFactory, presentations, conferences) {
    $scope.showImages = false;
    $scope.presentations = presentations;  // resolve method
    $scope.conferenceOptions = conferences;   // resolve method
  //  $scope.localesOptions = locales  // resolve method
    $scope.currentPresentationId = null;
    
    $scope.displayPresentationMedia = function(id){  
        $scope.presentationMedia = _.find($scope.presentations, {_id: id}).media;
        if ($scope.presentationMedia.length === 0 ) {
            $scope.presentationMedia.push({ 
                mediaType: 'image',
                url: 'Begin adding slides to your presentation! You can delete this message once you\'ve done that!' 
            });
        }
        $scope.currentPresentationId = id;
    };

    // corresponding $scope.presentations.media array is also spliced when removeCard runs
    $scope.removeCard = function(index){
        $scope.presentationMedia.splice(index,1);    
    };

    $scope.savePresentation = function(){
        PresentationFactory.savePresentation($scope.currentPresentationId, $scope.presentationMedia);
    };
    
    $scope.toggleImages = function(){
        $scope.showImages = $scope.showImages ? false : true;
    };
    
    $scope.sortableOptions = {
        additionPlaceholderClass: 'presentation-a-s'
    };

    // functionality for creating a new presentation 
    $scope.showTitleForm = function () {
        $scope.creating = true;
    };

    $scope.newPresentation = {
        title: '',
        presenter: null,
        media: []
    };

    // creating a presentation also adds the user as a presenter to a particular conference
    $scope.createPresentation = function (presentationData, conference_id) {
        $scope.creating = false;    // to hide the input box
        return PresentationFactory.createPresentation(presentationData)
                .then(function (newPresentation) {
                    $scope.presentations.push(newPresentation);
                    return ConferenceFactory.addConferencePresenter(conference_id, Session.user._id);    
                })
                .then(function (conference) {
                    console.log('added the user to this conference as a presenter: ', conference);
                });
    };

    // functionality for removing a presentation goes here

});