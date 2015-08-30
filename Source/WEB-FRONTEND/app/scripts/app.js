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
    'ui.bootstrap','chart.js'
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
                controller: 'RegisterCtrl',
                templateUrl: 'views/register.html',
                controllerAs: 'reg'
      })
      .when('/start-tour/:step', {
                controller: 'StartTourCtrl',
                templateUrl: 'views/start-tour.html',
                controllerAs: 'startTour'
      })
      .otherwise({
        redirectTo: '/welcome-page'
      });


  }
  run.$inject = ['$rootScope', '$location', '$cookieStore', '$http','gettextCatalog','$cookies'];
  function run($rootScope, $location, $cookieStore, $http,gettextCatalog,$cookies) {
       $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
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
          restrictedPage = $.inArray($location.path(), ['/welcome-page']) === -1;
          if(restrictedPage)
          {
            $rootScope.bodylayout='main-body';
          }
          else {
            $rootScope.bodylayout='welcome-body';
          }

          gettextCatalog.setCurrentLanguage('vi_VN');
          gettextCatalog.debug = true;
      });


      $http.defaults.useXDomain = true;
  }
