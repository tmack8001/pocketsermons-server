angular.module('pocketsermons')
    .config(['$sceDelegateProvider', function ($sceDelegateProvider) {
        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from google storage.
            '*://storage.googleapis.com/sermonstreams-assets/**'
        ]);
    }]);
