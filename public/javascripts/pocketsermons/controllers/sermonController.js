angular.module('pocketsermons')
    .controller('SermonController', ['$scope', 'Sermons', '$location', function ($scope, Sermons, $location) {
        $scope.sermons = Sermons.query();

        $scope.save = function () {
            if (!$scope.newSermon || $scope.newSermon.length < 1) return;
            $location.url('/sermons/new?title=' + $scope.newSermon + '&permalink=' + $scope.newSermon.replace(' ', '-').toLowerCase());
        };
    }])

    .controller('SermonDetailCtrl', ['$scope', '$routeParams', 'Sermons', '$location', '$timeout', '$q', '$http', function ($scope, $routeParams, Sermons, $location, $timeout, $q, $http) {

        if (!$scope.sermon) {
            if ($routeParams.id === 'new') {
                $scope.sermon = {title: $routeParams.title, permalink: $routeParams.permalink, speakers: []};
                $scope.new = true;
                $scope.editing = true;
            } else {
                Sermons.get({id: $routeParams.id}, function (response) {
                    $scope.sermon = response.sermon;
                    if ($scope.sermon.speakers) {
                        // TODO: remove after adding name, email, image to the API
                        $scope.sermon.speakers = $scope.sermon.speakers.map(function (c, index) {
                            var contact = {
                                _id: c._id,
                                name: c.givenName + ' ' + c.familyName,
                                email: c.givenName.toLowerCase() + '.' + c.familyName.toLowerCase() + '@example.com', // TODO: replace with email
                                image: 'http://lorempixel.com/50/50/people?' + c._id // TODO: replace with profile picture
                            };
                            contact._lowername = contact.name.toLowerCase();
                            return contact;
                        });
                    }
                });
                $scope.editing = true;
                $scope.new = false;
            }
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
                speakers: $scope.sermon.speakers.map(function(c, index) {
                    return c._id;
                }),
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
            sermon.speakers = sermon.speakers.map(function(c, index) {
                return c._id;
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

        /**
         * Search for contacts.
         */
        $scope.querySearch = function(query) {
            var results = query ?
                $scope.allContacts.filter(createFilterFor(query)) : [];
            return results;
        };

        $scope.filterSelected = true;

        /**
         * Create filter function for a query string
         */
        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(contact) {
                return (contact._lowername.indexOf(lowercaseQuery) !== -1);
            };
        }

        function loadContacts(callback) {
            $http.get('/api/v1/speakers').
                success(function (data, status, headers, config) {
                    // this callback will be called asynchronously
                    // when the response is available
                    var speakers = data.speakers || [];
                    callback(speakers.map(function (c, index) {
                        var contact = {
                            _id: c._id,
                            name: c.givenName + ' ' + c.familyName,
                            email: c.givenName.toLowerCase() + '.' + c.familyName.toLowerCase() + '@example.com', // TODO: replace with email
                            image: 'http://lorempixel.com/50/50/people?' + c._id // TODO: replace with profile picture
                        };
                        contact._lowername = contact.name.toLowerCase();
                        return contact;
                    }));
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                    console.log('error:' + data);
                    return [];
                });
        }

        loadContacts(function (contacts) {
            $scope.allContacts = contacts;
        });
    }]);
