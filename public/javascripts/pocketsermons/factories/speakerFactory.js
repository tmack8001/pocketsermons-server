angular.module('pocketsermons')
    .factory('Speakers', ['$resource', function ($resource) {
        return $resource('/api/v1/speakers/:id', null, {
            'update': { method: 'PUT' },
            'query': { method: 'GET', isArray: true, transformResponse: function(data, headers) {
                return JSON.parse(data).speakers;
            }}
        });
    }]);
