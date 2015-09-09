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
        controller:'WelcomePageCtrl',
        templateUrl: 'views/welcome-page.html',
        controllerAs:'welcome'
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

       //$locationProvider.html5Mode(true);
  }
  run.$inject = ['$rootScope', '$location', '$cookieStore', '$http','gettextCatalog','$cookies'];
  function run($rootScope, $location, $cookieStore, $http,gettextCatalog,$cookies) {
       $http.defaults.headers.post['X-CSRFToken'] = $cookies.csrftoken;
      // keep user logged in after page refresh
      $rootScope.globals = $cookieStore.get('globals') || {};
      console.log('---cookie---');
      console.log($rootScope.globals.currentUser);
      console.log('---end cookie---');
      gettextCatalog.setCurrentLanguage('vi_VN');
      gettextCatalog.debug = true;
      if ($rootScope.globals.currentUser) {
          $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
      }
      if(!($rootScope.globals.currentUser))
      {
        $rootScope.isLogin=false;
      }else {
        $rootScope.isLogin=true;
      }
      $rootScope.$on('$locationChangeStart', function (event, next, current) {
          // redirect to welcome-page page if not logged in and trying to access a restricted page
          var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
          var isStartTour = $location.path().toLowerCase().indexOf('start-tour')>0;
          var loggedIn = $rootScope.globals.currentUser;
          if (restrictedPage && !loggedIn&&!isStartTour) {
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


      });


      $http.defaults.useXDomain = true;
  }
