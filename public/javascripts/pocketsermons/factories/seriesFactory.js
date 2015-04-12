angular.module('pocketsermons')
    .factory('Series', ['$resource', function ($resource) {
        return $resource('/api/v1/series/:id', null, {
            'update': { method: 'PUT' },
            'query': { method: 'GET', isArray: true, transformResponse: function(data, headers) {
                return JSON.parse(data).series;
            }}
        });
    }]);
