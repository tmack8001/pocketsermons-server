angular.module('sermoncast')
    .factory('Sermons', ['$resource', function ($resource) {
        return $resource('/api/sermons/:id', null, {
            'update': { method: 'PATCH' }
        });
    }]);