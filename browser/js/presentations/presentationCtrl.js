app.controller('PresentationCtrl', function ($scope, $timeout, $stateParams, Session, PresentationFactory, ConferenceFactory, presentations, conferences) {
    $scope.conferenceOptions = conferences;   // resolve method
    $scope.currentPresentation = null;
    $scope.presentations = presentations;
    $scope.presentationMedia = [];
    $scope.editing = false;

    // displayPresentationMedia runs when the presentation is first 
    // created as well as  when a presentation is clicked from the list
    $scope.displayPresentationMedia = function (presentation) {

        $scope.editing = true;

        $scope.currentPresentation = presentation;
        $scope.presentationMedia = _.find($scope.presentations, {_id: presentation._id}).media;  // !!! creates a reference

    };

    // corresponding $scope.presentations.media array is also spliced when removeCard runs (see displayPresentationMedia)
    $scope.removeCard = function (index) {
        $scope.presentationMedia.splice(index, 1);
    };

    $scope.showPresentationSaved = function () {

        $scope.saved = true;
        var savedTimeout = $timeout(function () {

            $scope.saved = false;
            $timeout.cancel(savedTimeout);
            savedTimeout = null;
        }, 1000);

    };
    $scope.savePresentation = function () {

        PresentationFactory.savePresentation($scope.currentPresentation._id, $scope.presentationMedia)
            .then(function () {

                $scope.showPresentationSaved();
            });

    };

    $scope.sortableOptions = {
        additionPlaceholderClass: 'presentation-thumbnail'
    };

    // functionality for creating a new presentation 
    $scope.showCreateForm = function () {
        $scope.creating = true;
    };

    $scope.closeCreateForm = function () {
        $scope.creating = false;
        refreshPresentationObj();
    };

    function refreshPresentationObj() {   // refresh $scope.newPresentation object
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
                $scope.displayPresentationMedia(newPresentation);
                refreshPresentationObj();
                return ConferenceFactory.addConferencePresenter(conference_id, Session.user._id);
            })
            .then(function (conference) {
                // should something happen here on the ui?
            });
    };

    // functionality for removing a presentation goes here
    $scope.checkboxModel = {};   // tracks all the checkboxes

    $scope.sure = function () {
        $scope.deletePresentations();
    };

    $scope.deletePresentations = function () {
        var idsToDelete = [], deleted_ids = [];
        $scope.presentationMedia = [];            // clear the displayed media
        angular.forEach($scope.checkboxModel, function (value, checkbox_id) {
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
                    return deleted_ids.indexOf(item._id) === -1;
                });
                $scope.checkboxModel = _.omit($scope.checkboxModel, deleted_ids);
            });
    };
});