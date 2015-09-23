'use strict';

/**
 * @ngdoc function
 * @name studigoApp.controller:LessonCtrl
 * @description
 * # LessonCtrl
 * Controller of the studigoApp
 */
 angular
         .module('studigoApp')
         .controller('LessonCtrl', LessonCtrl);

      LessonCtrl.$inject = ['$scope','$location', 'LessonService'];
     function LessonCtrl($scope,$location, LessonService) {
         var vm = this;



         (function initController() {

         })();
         $scope.isValid = true;
         $scope.getLessonInfo = function () {

         };
     }
