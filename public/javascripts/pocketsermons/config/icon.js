angular.module('pocketsermons')
    .config(function ($mdThemingProvider, $mdIconProvider) {
        $mdIconProvider
            .icon('ic_menu',        '/img/icon/ic_menu.svg',        24)
            .icon('ic_arrow_back',  '/img/icon/ic_arrow_back.svg',  24);
    });
