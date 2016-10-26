'use strict';
/**
 */
(function() {
    myApp.controller('appController', ['$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        'backendSession',
        'backendAuthService',
        'RAISE_BACKEND_AUTH_EVENTS',
        function($scope,
            $rootScope,
            $state,
            $stateParams,
            backendSession,
            backendAuthService,
            RAISE_BACKEND_AUTH_EVENTS) {


            $rootScope.$on('$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {
            });

            $rootScope.$on('$stateChangeSuccess', function(event, toState) {
            });

            $rootScope.$on(RAISE_BACKEND_AUTH_EVENTS.notAuthenticated, function(e) {
            });

            $rootScope.$on(RAISE_BACKEND_AUTH_EVENTS.loginSuccess, function(e) {
            });

            $rootScope.$on(RAISE_BACKEND_AUTH_EVENTS.loginTimeout, function() {
            });


        }
    ])
})();
