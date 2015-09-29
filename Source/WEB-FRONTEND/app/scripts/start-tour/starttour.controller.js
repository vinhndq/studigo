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

     StartTourController.$inject = ['$scope','$location', '$http','$routeParams','$sce'];
     function StartTourController($scope,$location,$http,$routeParams,$sce) {
          $scope.units = starttour_units;
          $scope.total_step = starttour_units.length;
          $scope.actionTemplate = 'views/start-tour/step-1.html';
          $scope.isLastStep=false;
          $scope.isFirstStep = true;
          $scope.isPassed = true;
          $scope.hasAnswer = false;
          $scope.stepInfo={'currentStep':0,'totalMark':0,'currentMark':0};
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
            $scope.question = $scope.units[$scope.stepInfo.currentStep-1];
            if($scope.question!=null)
            {
              $scope.question.question_content = $sce.trustAsHtml($scope.question.question_content);
              $scope.question.video_path=$sce.trustAsResourceUrl($scope.question.video_path);
            }
            console.log($scope.question);
            if($scope.stepInfo.currentStep>$scope.total_step)
            {
              $scope.isPassed = true;
              $scope.isLastStep=true;
            }
            if($scope.stepInfo.currentStep>0&&$scope.stepInfo.currentStep<$scope.total_step)
            {
              $scope.isFirstStep=false;
              $scope.isPassed = false;
            }
            if($scope.question.answer_type==='1')
            {
              $scope.hasAnswer = true;
            }
            else {
              $scope.hasAnswer = false;
            }


          //  $scope.actionTemplate = 'views/start-tour/step-'+$scope.stepInfo.currentStep+'.html';
            if(SOUND_TYPE===$scope.question.ui_type)
            {
              $scope.actionTemplate='views/lesson/word-tutorial.html';
              $scope.question = convertToWordSound($scope.question);
              console.log($scope.question);
            }
            else if(WORD_TYPE===$scope.question.ui_type)
            {
              $scope.actionTemplate='views/lesson/word-pronunciation.html';
              $scope.question = convertToWord($scope.question);
              console.log($scope.question);
            }
            else {
              $scope.actionTemplate='views/lesson/404.html';
            }
          };


     }
