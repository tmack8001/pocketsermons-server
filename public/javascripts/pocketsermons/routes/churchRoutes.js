angular.module('pocketsermons')
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/churches', {
                templateUrl: '/churches.html',
                controller: 'ChurchController'
            })

            .when('/churches/:id', {
                templateUrl: '/churchDetails.html',
                controller: 'ChurchDetailCtrl'
            });
    }]);
