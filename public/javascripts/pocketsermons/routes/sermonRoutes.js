angular.module('pocketsermons')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/sermons', {
                templateUrl: '/sermons.html',
                controller: 'SermonController'
            })

            .when('/sermons/:id', {
                templateUrl: '/sermonDetails.html',
                controller: 'SermonDetailCtrl'
            });
    }]);
