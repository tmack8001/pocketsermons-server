angular.module('pocketsermons')
    .controller('SermonController', ['$scope', 'Sermons', '$location', function ($scope, Sermons, $location) {
        $scope.sermons = Sermons.query();

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
            // verify required info
            if (!$scope.sermon || !$scope.sermon.permalink ||
            !$scope.sermon.title || !$scope.sermon.date || !$scope.sermon.videoUri) return;

            var object = new Sermons({
                permalink: $scope.sermon.permalink,
                title: $scope.sermon.title,
                date: $scope.sermon.date,
                description: $scope.sermon.description || '',
                videoUri: $scope.sermon.videoUri,
                series: $scope.sermon.series._id,
                church: $scope.sermon.church._id,
                speakers: [$scope.new_speaker_id],
                completed: false
            });

            object.$save(function () {
                $scope.newSermon = ''; // clear textbox
                $location.url('/sermons');
            });
        };

        $scope.update = function(){
            var sermon = $scope.sermon;

            sermon.description =  sermon.description || '';
            sermon.series = sermon.series._id;
            sermon.church = sermon.church._id;
            var speakers = [].map.call(sermon.speakers, function(obj) {
                return obj._id;
            });

            // add new speaker
            if ($scope.new_speaker_id) {
                speakers = speakers || [];
                speakers.push($scope.new_speaker_id);
            }

            // dedupe list of speakers
            sermon.speakers = speakers.filter(function(item, pos) {
                return speakers.indexOf(item) === pos;
            });

            Sermons.update({id: sermon._id}, sermon);
            $scope.editing = false;
        };

        $scope.removeSpeaker = function(speaker) {
            var index = $scope.sermon.speakers.indexOf(speaker);
            $scope.sermon.speakers.splice(index, 1);
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
