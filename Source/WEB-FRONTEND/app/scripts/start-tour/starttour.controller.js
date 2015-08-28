'use strict';

/**
 * @ngdoc function
 * @name studigoApp.controller:StartTourCtrl
 * @description
 * # StartTourCtrl
 * Controller of the studigoApp
 */
 angular
         .module('studigoApp')
         .controller('StartTourCtrl', StartTourController);

     StartTourController.$inject = ['$scope','$location', '$http','$routeParams'];
     function StartTourController($scope,$location,$http,$routeParams) {
          $scope.actionTemplate = 'views/start-tour/'+$routeParams.step+'.html';
          console.log('go to Start tour');
          console.log($scope.actionTemplate)
     }
