'use strict';

/**
 * @ngdoc function
 * @name studigoApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the studigoApp
 */
 angular
         .module('studigoApp')
         .controller('MainCtrl', MainController);

     MainController.$inject = ['$scope','$location', '$http'];
     function MainController($scope,$location,$http) {

          console.log('go to Homepage');
          console.log($scope.params)
     }
