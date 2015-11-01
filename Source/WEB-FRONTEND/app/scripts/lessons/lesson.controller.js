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

      LessonCtrl.$inject = ['$rootScope','$scope','$location', '$http','$routeParams','$sce','LessonService'];
     function LessonCtrl($rootScope,$scope,$location,$http,$routeParams,$sce, LessonService) {
         var vm = this;



         (function initController() {
           if($rootScope.isStartTour)
           {
             $scope.questions = getStartTourQuestion();
             $scope.total_step = $scope.questions.length;
             $scope.actionTemplate = 'views/start-tour/step-1.html';
             $scope.isLastStep=false;
             $scope.isFirstStep = true;
             $scope.isPassed = true;
             $scope.hasAnswer = false;
             $scope.stepInfo={'currentStep':0,'totalMark':0,'currentMark':0};
             $scope.chosenPlayerId = 2;
           }

         })();

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
           var nextStep = changeStep($scope.stepInfo.currentStep,1);
           $scope.redirect($scope.stepInfo.currentStep,nextStep);
           $scope.stepInfo.currentStep = nextStep ;
         };
         $scope.finish = function()
         {
           $location.path('/');
         };
         $scope.skip=function()
         {
           var nextStep = changeStep($scope.stepInfo.currentStep,1);
           $scope.redirect($scope.stepInfo.currentStep,nextStep);
           $scope.stepInfo.currentStep = nextStep ;
         };
         $scope.readAgain = function()
         {
           var nextStep = changeStep($scope.stepInfo.currentStep,-1);
           $scope.redirect($scope.stepInfo.currentStep,nextStep);
           $scope.stepInfo.currentStep = nextStep ;
         }
         $scope.redirect = function(current_step,next_step)
         {

           var question = $scope.questions[current_step];

        /*   if($scope.question!=null)
           {
             $scope.question.question_content = $sce.trustAsHtml($scope.question.question_content);
             $scope.question.video_path=$sce.trustAsResourceUrl($scope.question.video_path);
           }*/

           if(next_step>$scope.total_step)
           {
             $scope.isPassed = true;
             $scope.isLastStep=true;
           }
           if(next_step>0&&next_step<$scope.total_step)
           {
             $scope.isFirstStep=false;
             $scope.isPassed = false;
           }
           if(question.answer_type==='1')
           {
             $scope.hasAnswer = true;
           }
           else {
             $scope.hasAnswer = false;
           }

          $scope.actionTemplate=getRedirectPage(question.type);
          $scope.question = convertQuestionData(question);
         };

         function getStartTourQuestion()
         {
           var units = starttour_units;
           var startTourQuestions=[];
           for(var i=0;i<units.length;i++)
           {
             var questions = units[i].questions;
             for(var j=0;j<questions.length;j++)
             {
               questions[j].unit_type=units[i].type;
               startTourQuestions.push(questions[j]);
             }
           }
           return startTourQuestions;
         }
         function getQuestionAttrs(questionId)
         {
           if(questionId===1)
           {
             return data_1;
           }else if(questionId===2){
             return data_2;
           }else if(questionId===3){
             return data_3;
           }else if(questionId===15){
             return data_15;
           }else if(questionId===17){
             return data_17;
           }else if(questionId===4){
             return data_4;
           }else if(questionId===16){
             return data_16;
           }
         }
         function convertQuestionData(question)
         {
           var ui_type = question.type;
           var question_attrs = getQuestionAttrs(question.questionid);
           question.questionattributes = question_attrs;
           question.video_path=$sce.trustAsResourceUrl(question.video_path);
           question.audio_path=$sce.trustAsResourceUrl(question.audio_path);
           if(UI_SOUND_TYPE===ui_type)
           {
             return convertToWordSound(question,$sce);
           }
           else if(UI_WORD_TYPE===ui_type)
           {
              return convertToWord(question,$sce);

           }
           else if(UI_LISTEN_TYPE===ui_type)
           {
              return convertToListen(question,$sce);
           }
           else if(UI_READING_TYPE===ui_type)
           {
              return convertToReadParagraph(question,$sce);
           }
           else if(UI_READ_AND_QUESTION_TYPE===ui_type)
           {
              return convertToReadAndQuestion(question,$sce);
           }
           else if(UI_DIALOGUE_TYPE===ui_type)
           {


              return convertToConversation(question,$sce);
           }

         }

         function getRedirectPage(ui_type)
         {

           if(UI_SOUND_TYPE===ui_type)
           {
             return 'views/lesson/word-tutorial.html';
           }
           else if(UI_WORD_TYPE===ui_type)
           {
             return 'views/lesson/word-pronunciation.html';

           }
           else if(UI_LISTEN_TYPE===ui_type)
           {
             return 'views/lesson/listen.html';
           }
           else if(UI_READING_TYPE===ui_type)
           {
             return 'views/lesson/reading-paragraph.html';
           }
           else if(UI_READ_AND_QUESTION_TYPE===ui_type)
           {
             return 'views/lesson/reading-question.html';
           }
           else if(UI_DIALOGUE_TYPE===ui_type)
           {
             return 'views/lesson/conversation.html';
           }
           else {
             return 'views/lesson/404.html';
           }
         }

         $scope.playConversation=function(index,question)
         {
             console.log('conversation index : '+index);
             $scope.indexPlaying = index;
             if(index==question.length)
             {
               return;
             }
             var q = $scope.question[index];
             if(q.playerid===$scope.chosenPlayerId)
             {
               startRecord(q.wait_time,index,question);
             }
             else {
               $scope.audio = document.createElement('audio');
               $scope.audio.src = q.audio_path;
               $scope.audio.play();
               $scope.audio.addEventListener('ended', function() {
                     $scope.playConversation(index+1,question);
                });
             }


         };

         function startRecord(waitTime,index,question){
           if(annyang)
           {
             // Let's define our first command. First the text we expect, and then the function it should call
             console.log('annyang started');
             $scope.textTalked='';
             var commands = {
               '*term': function(term) {
                //  console.log('talked : '+(term!=''));

                var curdate= new Date();
                var endTime= curdate.getTime();

                console.log('talked : '+term);
                if(term!=''||endTime-startTime>=q.wait_time*1000)
                {
                  $scope.textTalked = term;
                  annyang.abort();
                  console.log('annyang stopped');
                  $scope.playConversation($scope.indexPlaying+1,question);

                }
               }
             };

             // Add our commands to annyang
             annyang.addCommands(commands);
             annyang.debug();
             // Start listening. You can call this here, or attach this call to an event, button, etc.
             annyang.setLanguage('en');
             var curdate= new Date();
             var startTime= curdate.getTime();
             var endTime= curdate.getTime();
             annyang.start();

             //$('#recorder').attr("src","images/icons/waiting.png");
           }
         }
     }
