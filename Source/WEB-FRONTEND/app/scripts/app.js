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
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/index', {
        templateUrl: 'views/welcome-page.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/index'
      });
  });
