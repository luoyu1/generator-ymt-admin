'use strict';

/**
 * app config
 */
var myApp = angular
    .module('myApp', [
        'ngResource',
        'ngSanitize',
        'ui.router',
        'ui.bootstrap',
        'ngCookies',
        'ncy-angular-breadcrumb'
    ]).config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
        function($stateProvider, $urlRouterProvider, $httpProvider) {

            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: "home/home.html",
                    controller: 'homeController',
                    ncyBreadcrumb: {
                        label: '首页'
                    }
                })
                .state('index', {
                    url: '/login',
                    templateUrl: '/home/before_login.html'
                })

        }
    ]).run(
        ['$rootScope', '$state', '$stateParams',
            function($rootScope, $state, $stateParams) {
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]
    );
