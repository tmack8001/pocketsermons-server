(function () {
    'use strict';
    angular
        .module('pocketsermons')
        .controller('MenuCtrl', function ($scope, $timeout, $mdSidenav, $mdUtil, $log) {
            /**
             * Build handler to open/close a SideNav; when animation finishes
             * report completion in console
             */
            function buildToggler(navID) {
                var debounceFn = $mdUtil.debounce(function () {
                    $mdSidenav(navID)
                        .toggle()
                        .then(function () {
                            $log.debug('toggle ' + navID + ' is done');
                        });
                }, 300);
                return debounceFn;
            }

            $scope.toggleLeft = buildToggler('left');
            $scope.toggleRight = buildToggler('right');
        })
        .controller('LeftCtrl', function ($scope, $location, $timeout, $mdSidenav, $log) {
            $scope.navigate = function (url) {
                $log.debug('navigate to ' + url);
                $location.url(url);
            };
            $scope.close = function () {
                $mdSidenav('left').close()
                    .then(function () {
                        $log.debug('close LEFT is done');
                    });
            };
        });
})();
