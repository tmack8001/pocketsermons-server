angular.module('pocketsermons')
    .controller('SeriesController', ['$scope', 'Series', function ($scope, Series) {
        $scope.series = Series.query();

        $scope.save = function () {
            if (!$scope.newSeries || $scope.newSeries.length < 1) return;
            var object = new Series({
                title: $scope.newSeries,
                permalink: $scope.newSeries.replace(' ', '-').toLowerCase(),
                completed: false
            });

            object.$save(function () {
                $scope.series.push(object.series);
                $scope.newSeries = ''; // clear textbox
            });
        };
    }])

    .controller('SeriesDetailCtrl', ['$scope', '$routeParams', 'Series', '$location', function ($scope, $routeParams, Series, $location) {
        Series.get({id: $routeParams.id}, function(response) {
            $scope.series = response.series;
        });
        $scope.editing = false;

        $scope.update = function(){
            var series = $scope.series;

            // breakdown ObjectId references
            series.church = series.church._id;

            Series.update({id: series._id}, series, function(res) {
                if (res && res.$resolved) {
                    $scope.series = res.series;
                }
            });
            $scope.editing = false;
        };

        $scope.edit = function() {
            $scope.editing = angular.copy($scope.series);
        };

        $scope.remove = function() {
            var series = $scope.series;
            Series.remove({id: series._id}, function(){
                $location.url('/series');
            });
        };

        $scope.cancel = function() {
            $scope.series = angular.copy($scope.editing);
            $scope.editing = false;
        };
    }]);
