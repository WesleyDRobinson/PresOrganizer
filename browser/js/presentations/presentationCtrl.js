app.controller('PresentationCtrl',function ($scope, $stateParams, PresentationFactory, getPresentations) {
    $scope.showImages = false;
    $scope.presentations = getPresentations;
    $scope.currentPresentationId;
    $scope.setPresentationMedia = function(id){     // refactor later include the presentation title
       $scope.presentationMedia= _.find($scope.presentations, {_id: id}).media;
       $scope.currentPresentationId = id;
    };

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
        containment: '#board'
    };
            
    $scope.dragOptions = {
        containment: '#board'
    };

    $scope.sortableOptions = {
        containment: '#sortable-container'
    };

    // creating a new presentation functionality
    $scope.showTitleForm = function () {
        $scope.creating = true;
    }

    $scope.createPresentation = function (title) {
        $scope.creating = false;
        console.log('adding presentation!');
    }
});