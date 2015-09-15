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
          
          $scope.stepInfo={'currentStep':1,'totalMark':0,'step1Mark':0,'step2Mark':0,'step3Mark':0,'step4Mark':0};

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

            switch ($scope.stepInfo.currentStep) {
              case 1:
                $scope.stepInfo.step1Mark=0;
                break;
              case 2:
                $scope.stepInfo.step2Mark=0;
                break;
              case 3:
                $scope.stepInfo.step3Mark=0;
                break;
              case 4:
                $scope.stepInfo.step4Mark=0;
                break;
              default:
                break;
            }
            $scope.redirect();
          };
          $scope.redirect = function()
          {

            $scope.stepInfo.currentStep++;
            if($scope.stepInfo.currentStep===4)
            {
              $scope.isLastStep=true;
            }
            if($scope.stepInfo.currentStep>1)
            {
              $scope.isFirstStep=false;
            }
            $scope.stepInfo.totalMark = $scope.stepInfo.step1Mark+$scope.stepInfo.step2Mark+$scope.stepInfo.step3Mark+$scope.stepInfo.step4Mark;
            $scope.actionTemplate = 'views/start-tour/step-'+$scope.stepInfo.currentStep+'.html';
          };
     }
