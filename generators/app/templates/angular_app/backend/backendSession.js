"use strict";
/**
 * description: 
 * createdDate: 
 *
 **/
(function() {
    myApp.factory('backendSession',['$window','$cookieStore', function($window,$cookieStore) {
       
       this.setAuthToken = function(authToken){
          $cookieStore.put('authToken', authToken);
       }

       this.getAuthToken = function(){
          return $cookieStore.get('authToken');
       }

       this.setUserName = function(userName){
          $cookieStore.put('userName',userName)
       }

       this.getUserName = function(userName){
          return $cookieStore.get('userName')
       }
       this.destroy = function(){
          $window.sessionStorage.removeItem('authToken');
       }

       this.setSelectCust = function(custId,custName,roleIds){
          $cookieStore.put('custId',custId);
          $cookieStore.put('custName',custName);
          $cookieStore.put('roleIds',roleIds);
       }

       this.getSelectCust = function(){
          var custId = $cookieStore.get('custId');
          var custName = $cookieStore.get('custName');
          var roleIds = $cookieStore.get('roleIds');
          roleIds = roleIds || '';
          return {
            custId :custId,
            custName :custName,
            roleIds:roleIds
          }
       }
       
       return this;
    }]);
})();