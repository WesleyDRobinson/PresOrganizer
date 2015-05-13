app.config(function ($stateProvider) {

    $stateProvider.state('presentations', {
        url: '/presentations',
        templateUrl: 'js/presentations/presentations.html',
        controller: function () {
            
        },
        // // The following data.authenticate is read by an event listener
        // // that controls access to this state. Refer to app.js.
        // data: {
        //     authenticate: true
        // }
    });

});

