angular.module('pocketsermons')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/series', {
                templateUrl: '/series.html',
                controller: 'SeriesController'
            })

            .when('/series/:id', {
                templateUrl: '/seriesDetails.html',
                controller: 'SeriesDetailCtrl'
            });
    }]);
