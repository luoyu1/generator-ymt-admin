'use strict';
/**
*/
(function(){
	myApp.controller('navController', 
		['$scope',
			'$rootScope',
			'$state',
			'$stateParams',
			'backendSession',
		function($scope,
			$rootScope,
			$state,
			$stateParams,
			backendSession){ 

		 $scope.menus = [{ 'resourceName': '一级目录' }, { 'resourceName': '一级目录' }, { 'resourceName': '一级目录', 'children': [{ 'resourceName': '二级目录' }, { 'resourceName': '二级目录' }] }];
		  
	}])
})();