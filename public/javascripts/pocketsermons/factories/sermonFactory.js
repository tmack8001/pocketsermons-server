angular.module('pocketsermons')
    .factory('Sermons', ['$resource', function ($resource) {
        return $resource('/api/v1/sermons/:id', null, {
            'update': { method: 'PATCH' },
            'query': { method: 'GET', isArray: true, transformResponse: function(data, headers) {
                return JSON.parse(data).sermons;
            }}
        });
    }]);
