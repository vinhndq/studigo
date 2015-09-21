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
          $scope.actionTemplate = 'views/start-tour/step-1.html';
          $scope.isLastStep=false;
          $scope.isFirstStep = true;
          $scope.isPassed = true;
          $scope.stepInfo={'currentStep':1,'totalMark':0,'currentMark':0};
          $scope.check=function()
          {

            $scope.stepInfo.currentMark=0.8;
            if($scope.stepInfo.currentMark>=0.6)
            {
              $scope.isPassed = true;
            }
            else {
              $scope.isPassed = false;
            }
          };
          $scope.next = function()
          {
            $scope.redirect();

          };
          $scope.finish = function()
          {
            console.log("finished");
            $location.path('/');
          };
          $scope.skip=function()
          {
            $scope.redirect();
          };
          $scope.redirect = function()
          {

            $scope.stepInfo.currentStep++;
            if($scope.stepInfo.currentStep===6)
            {
              $scope.isPassed = true;
              $scope.isLastStep=true;
            }
            if($scope.stepInfo.currentStep>1&&$scope.stepInfo.currentStep<6)
            {
              $scope.isFirstStep=false;
              $scope.isPassed = false;
            }

            $scope.stepInfo.totalMark = $scope.stepInfo.step1Mark+$scope.stepInfo.step2Mark+$scope.stepInfo.step3Mark+$scope.stepInfo.step4Mark;
            $scope.actionTemplate = 'views/start-tour/step-'+$scope.stepInfo.currentStep+'.html';
          };

          
     }
