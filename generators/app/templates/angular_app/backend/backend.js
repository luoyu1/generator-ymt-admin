'use strict';
/**
  http interceptors 
*/
(function(){
    myApp.config([
    '$httpProvider', 
    function($httpProvider) {

    // TODO: get all the interceptors here
    /* Registers auth token interceptor, auth token is either passed by header or by query parameter
     * as soon as there is an authenticated user */
    $httpProvider.interceptors.push(['$q', '$injector','$rootScope', 'configuration',
        function ($q, $injector,$rootScope,configuration) {
      return {
        request: function(config) {
          //backend apiBaseUrl
          var url =  config.url;
          if(/^\/api\S+$/.test(url)){
            config['url']= configuration.apiBaseUrl+url;
            var backendSessionService = $injector.get('backendSession');
            var authToken = backendSessionService.getAuthToken();                    
            if (typeof authToken !== 'undefined' && authToken) {
              config.headers['Authorization'] = authToken
            }
          }
          
          // if (config.method === 'PUT') {
          //   delete config.headers['Content-Type'];
          //   delete config.headers['Accept']; 
          // }
          

          return config || $q.when(config);
        },
        'response': function(response) {
          // do something on success
          if(response.status==200 && response.data.success===false){

          }else{
            return response || $q.when(response);
          }
          
        },
        responseError: function(rejection) {
          if (rejection.status === 401) {
            var backendSession = $injector.get('backendSession');
            var RAISE_BACKEND_AUTH_EVENTS = $injector.get('RAISE_BACKEND_AUTH_EVENTS');
            
            backendSession.destroy();
            $rootScope.$broadcast(RAISE_BACKEND_AUTH_EVENTS.notAuthenticated);
          }else if(rejection.status ===403){
            
          } 
          return $q.reject(rejection);
        }
      };
    }]);
    
  }]);
})();