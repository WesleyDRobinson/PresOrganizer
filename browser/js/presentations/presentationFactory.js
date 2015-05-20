app.factory('PresentationFactory', function ($q, $http, Session) {
    return {
        createPresentation : function (presentationData) {
            presentationData.presenter = Session.user._id; // add presenter id to presentation
            return $http.post('/api/presentation/', presentationData)
                .then(function (res) {
                    return res.data;
                });
        },
        getPresentations   : function () {
            return $http.get('/api/presentation/user/me')
                .then(function (res) {
                    return res.data;
                });
        },
        savePresentation   : function (presentationId, mediaArray) {
            return $http.put('/api/presentation/' + presentationId, {media: mediaArray})
                .then(function (res) {
                    return res.data;
                });
        },
        deletePresentations: function (presentation_ids) {    // refactor into a promise...
            var promises = [];
            presentation_ids.forEach(function (id) {
                promises.push($http.delete('/api/presentation/' + id));
            });
            return $q.all(promises).then(function (res) {
                return res;
            });
        }
    }
});
