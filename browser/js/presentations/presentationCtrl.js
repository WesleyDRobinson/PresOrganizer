app.controller('PresentationCtrl',function ($scope, $stateParams, PresentationFactory, getPresentations) {
    $scope.showImages = false;
    $scope.presentations = getPresentations;
    $scope.currentPresentationId;
    
    $scope.displayPresentationMedia = function(id){  
        $scope.presentationMedia = _.find($scope.presentations, {_id: id}).media;
        if ($scope.presentationMedia.length === 0 ) {
            $scope.presentationMedia.push({ 
                url: 'Begin adding slides to your presentation! You can delete this message once you\'ve done that!' 
            });
        }
        $scope.currentPresentationId = id;
        console.log($scope.presentations);
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
            


    // creating a new presentation functionality
    $scope.showTitleForm = function () {
        $scope.creating = true;
    };

    $scope.newPresentation = {
        title: '',
        presenter: null,
        media: []
    };

    $scope.createPresentation = function (presentationData) {
        $scope.creating = false;    // to hide the input box
        return PresentationFactory.createPresentation(presentationData)
                .then(function (newPresentation) {
                    $scope.presentations.push(newPresentation);
                });
    };

});