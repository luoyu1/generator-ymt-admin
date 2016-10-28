'use strict';
/**
 */
(function() {
    myApp.controller('navController', ['$scope',
        '$rootScope',
        '$state',
        '$stateParams',
        'backendSession',
        function($scope,
            $rootScope,
            $state,
            $stateParams,
            backendSession) {
        	var width = $(window).width();
            if (width < 768) {
                $scope.collapse = function() {
                    $('body').toggleClass('sidebar-open');
                }
            } else {
                $scope.collapse = function() {
                    $('body').toggleClass('sidebar-collapse');
                }
            }

            $scope.menus = [{ 'resourceName': '一级目录', 'children': [] }, { 'resourceName': '一级目录' }, { 'resourceName': '一级目录', 'children': [{ 'resourceName': '二级目录' }, { 'resourceName': '二级目录' }] }];

        }
    ])
})();
