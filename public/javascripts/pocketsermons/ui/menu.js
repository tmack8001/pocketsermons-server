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
            $scope.navigate = function (section) {
                if (section !== null) {
                    $scope.openedSection = section;
                    $location.url(section.location);
                }
            };
            $scope.close = function () {
                $mdSidenav('left').close()
                    .then(function () {
                        $log.debug('close LEFT is done');
                    });
            };

            $scope.isSectionSelected = function(section) {
                return $scope.openedSection === section;
            };

            var items = ['Churches', 'Series', 'Sermons', 'Speakers'];
            $scope.menu = {
                sections: items.map(function (c, index) {
                    return {name: c, location: '/' + c.toLowerCase()};
                })
            };

            $scope.openedSection = (function(location) {
                return $scope.menu.sections.filter(function (section) {
                    return section.location === location;
                })[0];
            }($location.$$path));
        });
})();
