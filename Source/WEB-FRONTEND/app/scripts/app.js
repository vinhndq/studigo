'use strict';

/**
 * @ngdoc overview
 * @name studigoApp
 * @description
 * # studigoApp
 *
 * Main module of the application.
 */
angular
  .module('studigoApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'gettext',
    'ui.bootstrap'
  ])
  .config(config)
  .run(run);
  config.$inject = ['$routeProvider', '$locationProvider','$httpProvider'];
  function config($routeProvider, $locationProvider,$httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/welcome-page', {
        templateUrl: 'views/welcome-page.html',
      })
      .when('/register', {
                controller: 'RegisterController',
                templateUrl: 'views/register.html',
                controllerAs: 'reg'
      })
      .otherwise({
        redirectTo: '/welcome-page'
      });

      $httpProvider.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
  }
  run.$inject = ['$rootScope', '$location', '$cookieStore', '$http','gettext'];
  function run($rootScope, $location, $cookieStore, $http,gettextCatalog) {
      // keep user logged in after page refresh
      $rootScope.globals = $cookieStore.get('globals') || {};
      if ($rootScope.globals.currentUser) {
          $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }

      $rootScope.$on('$locationChangeStart', function (event, next, current) {
          // redirect to welcome-page page if not logged in and trying to access a restricted page
          var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
          var loggedIn = $rootScope.globals.currentUser;
          if (restrictedPage && !loggedIn) {
              $location.path('/welcome-page');
          }
      });
      gettextCatalog.currentLanguage='en';
      gettextCatalog.debug=true;
  }
