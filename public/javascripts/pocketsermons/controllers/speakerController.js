angular.module('pocketsermons')
    .controller('SpeakerController', ['$scope', 'Speakers', function ($scope, Speakers) {
        $scope.speakers = Speakers.query();

        $scope.save = function () {
            console.log($scope.newSpeaker.split(' ').length !== 2);
            if (!$scope.newSpeaker || $scope.newSpeaker.length < 1 ||
                $scope.newSpeaker.split(' ').length !== 2) return;

            var names = $scope.newSpeaker.split(' ', 2);
            var object = new Speakers({
                givenName: names[0],
                familyName: names[1],
                permalink: $scope.newSpeaker.replace(' ', '-').toLowerCase(),
                completed: false
            });

            object.$save(function () {
                $scope.speakers.push(object.speaker);
                $scope.newSpeaker = ''; // clear textbox
            });
        };
    }])

    .controller('SpeakerDetailCtrl', ['$scope', '$routeParams', 'Speakers', '$location', function ($scope, $routeParams, Speakers, $location) {
        Speakers.get({id: $routeParams.id}, function(response) {
            $scope.speaker = response.speaker;
        });
        $scope.editing = false;

        $scope.update = function(){
            var speaker = $scope.speaker;

            Speakers.update({id: speaker._id}, speaker);
            $scope.editing = false;
        };

        $scope.edit = function() {
            $scope.editing = angular.copy($scope.speaker);
        };

        $scope.remove = function() {
            var speaker = $scope.speaker;
            Speakers.remove({id: speaker._id}, function(){
                $location.url('/speakers');
            });
        };

        $scope.cancel = function() {
            $scope.speaker = angular.copy($scope.editing);
            $scope.editing = false;
        };
    }]);
