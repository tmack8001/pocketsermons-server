angular.module('pocketsermons')
    .factory('Churches', ['$resource', function ($resource) {
        return $resource('/api/v1/churches/:id', null, {
            'update': { method: 'PUT' },
            'query': { method: 'GET', isArray: true, transformResponse: function(data, headers) {
                return JSON.parse(data).churches;
            }}
        });
    }]);
