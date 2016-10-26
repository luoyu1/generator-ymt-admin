'use strict';

(function() {
  myApp
    .factory('backendAuthService', [
      '$http',
      '$rootScope',
      'backendSession',
      'RAISE_BACKEND_AUTH_EVENTS',
      'configuration',
      function($http,
        $rootScope,
        backendSession,
        RAISE_BACKEND_AUTH_EVENTS,
        configuration) {

        return {
          authenticate: function(user) {
            //var parameters = $.param(user);

            var authRequest = $http({
              url: '/api/rbac/login',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              data: user
            });

            authRequest.success(function(data) {
              backendSession.setAuthToken(data.token);
              backendSession.setUserName(data.username);
              $rootScope.$broadcast(RAISE_BACKEND_AUTH_EVENTS.loginSuccess);
            });

            authRequest.error(function(data, status, headers, config) {
              //data.message = "Login failed.";
              $rootScope.$broadcast(RAISE_BACKEND_AUTH_EVENTS.loginFailed);
            })

            return authRequest;
          },
          authenticateByCookie:function(){
             //var parameters = $.param(user);

            var authRequest = $http({
              url: '/api/rbac/auth',
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              }
            });

            authRequest.success(function(data) {
              if(data.token){
                backendSession.setAuthToken(data.token);
                backendSession.setUserName(data.username);
                $rootScope.loginUser = data.user;
                $rootScope.$broadcast(RAISE_BACKEND_AUTH_EVENTS.loginSuccess);
              }else{
                $rootScope.$broadcast(RAISE_BACKEND_AUTH_EVENTS.loginFailed);
              }
              
            });

            authRequest.error(function(data, status, headers, config) {
              //data.message = "Login failed.";
              $rootScope.$broadcast(RAISE_BACKEND_AUTH_EVENTS.loginFailed);
            })

            return authRequest;
          },
          /* 
            unused
          */
          passwordReset: function(password, token) {
            var parameters = $.param({
              password: password,
              sptoken: token
            });
            var resetPassRequest = $http({
              url: configuration.apiBaseUrl + '/user/password',
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: parameters
            });

            resetPassRequest.success(function(data) {
              console.log(data);
            });

            resetPassRequest.error(function(data) {
              console.log(data);
            });

            return resetPassRequest;
          },
          /*
            unused
          */
          sendResetPasswordEmail: function(userName) {
            var parameters = $.param({
              user_name: userName
            });
            var sendResetEmailRequest = $http({
              url: configuration.apiBaseUrl + '/user/resetemail',
              method: 'POST',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              },
              data: parameters
            });

            sendResetEmailRequest.success(function(data) {
              console.log(data);
            });

            sendResetEmailRequest.error(function(data) {
              console.log(data);
            });

            return sendResetEmailRequest;
          },

          deauthenticate: function() {
            backendSession.destroy();
            $rootScope.$broadcast(RAISE_BACKEND_AUTH_EVENTS.logoutSuccess);
            //$idle.unwatch();
          },

          isAuthenticated: function() {
            return !!backendSession.getAuthToken();
          }
        };
      }
    ])

  .constant('RAISE_BACKEND_AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    notAuthenticated: 'auth-not-authenticated',
    loginTimeout: 'auth-login-timeout'
  });
})();
