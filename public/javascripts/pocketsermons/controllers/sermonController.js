angular.module('pocketsermons')
    .controller('SermonController', ['$scope', 'Sermons', '$location', function ($scope, Sermons, $location) {
        $scope.sermons = Sermons.query();

        // TODO: need to figure out how to create a new Sermon fully since API requires various conditions to be met
        $scope.save = function () {
            if (!$scope.newSermon || $scope.newSermon.length < 1) return;
            $location.url('/sermons/new?title=' + $scope.newSermon + '&permalink=' + $scope.newSermon.replace(' ', '-').toLowerCase());
        };
    }])

    .controller('SermonDetailCtrl', ['$scope', '$routeParams', 'Sermons', '$location', function ($scope, $routeParams, Sermons, $location) {
        if ($routeParams.id === 'new') {
            var sermon = { title: $routeParams.title, permalink: $routeParams.permalink};
            $scope.sermon = sermon;
            $scope.new = true;
            $scope.editing = true;
        } else {
            Sermons.get({id: $routeParams.id}, function(response) {
                $scope.sermon = response.sermon;
            });
            $scope.editing = false;
            $scope.new = false;
        }

        $scope.save = function () {
            console.log('saving new sermon');
            console.log($scope.sermon);
            // verify required info
            if (!$scope.sermon || !$scope.sermon.permalink ||
            !$scope.sermon.title || !$scope.sermon.date || !$scope.sermon.videoUri) return;

            var object = new Sermons({
                permalink: $scope.sermon.permalink,
                title: $scope.sermon.title,
                date: $scope.sermon.date,
                description: $scope.sermon.description,
                videoUri: $scope.sermon.videoUri,
                series: $scope.sermon.series._id,
                church: $scope.sermon.church._id,
                completed: false
            });
            console.log(object);
            object.$save(function () {
                $scope.newSermon = ''; // clear textbox
                $location.url('/sermons');
            });
        };

        $scope.update = function(){
            var sermon = $scope.sermon;

            console.log(sermon);

            sermon.series = sermon.series._id;
            sermon.church = sermon.church._id;
            sermon.speakers = [].map.call(sermon.speakers, function(obj) {
                return obj._id;
            });

            Sermons.update({id: sermon._id}, sermon);
            $scope.editing = false;
        };

        $scope.edit = function() {
            $scope.editing = angular.copy($scope.sermon);
        };

        $scope.remove = function() {
            var sermon = $scope.sermon;
            Sermons.remove({id: sermon._id}, function(){
                $location.url('/sermons');
            });
        };

        $scope.cancel = function() {
            $scope.sermon = angular.copy($scope.editing);
            $scope.editing = false;
        };
    }]);
