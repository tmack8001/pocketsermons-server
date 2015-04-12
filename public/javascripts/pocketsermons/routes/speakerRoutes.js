angular.module('pocketsermons')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/speakers', {
                templateUrl: '/speakers.html',
                controller: 'SpeakerController'
            })

            .when('/speakers/:id', {
                templateUrl: '/speakerDetails.html',
                controller: 'SpeakerDetailCtrl'
            });
    }]);
