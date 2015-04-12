angular.module('pocketsermons')
    .controller('ChurchController', ['$scope', 'Churches', function ($scope, Churches) {
        $scope.churches = Churches.query();

        $scope.save = function () {
            if (!$scope.newChurch || $scope.newChurch.length < 1) return;
            var object = new Churches({
                name: $scope.newChurch,
                permalink: $scope.newChurch.replace(' ', '-').toLowerCase(),
                completed: false
            });

            object.$save(function () {
                $scope.churches.push(object.church);
                $scope.newChurch = ''; // clear textbox
            });
        };
    }])

    .controller('ChurchDetailCtrl', ['$scope', '$routeParams', 'Churches', '$location', function ($scope, $routeParams, Churches, $location) {
        Churches.get({id: $routeParams.id}, function(response) {
            $scope.church = response.church;
        });
        $scope.editing = false;

        $scope.update = function(){
            var church = $scope.church;

            Churches.update({id: church._id}, church);
            $scope.editing = false;
        };

        $scope.edit = function() {
            $scope.editing = angular.copy($scope.church);
        };

        $scope.remove = function() {
            var church = $scope.church;
            Churches.remove({id: church._id}, function(){
                $location.url('/churches');
            });
        };

        $scope.cancel = function() {
            $scope.church = angular.copy($scope.editing);
            $scope.editing = false;
        };
    }]);
