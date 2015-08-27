'use strict';

/**
 * @ngdoc function
 * @name studigoApp.controller:LoginCtrl
 * @description
 * # LoginCtrl
 * Controller of the studigoApp
 */
 angular
         .module('studigoApp')
         .controller('LoginCtrl', LoginController);

     LoginController.$inject = ['$scope','$modal','$location', 'AuthenticationService', 'FlashService'];
     function LoginController($scope,$modal,$location, AuthenticationService, FlashService) {
         var vm = this;



         (function initController() {
             // reset login status
             AuthenticationService.ClearCredentials;
         })();

         $scope.login = function () {
             console.log('before login');
             vm.dataLoading = true;
             AuthenticationService.Login($scope.username, $scope.password, function (response) {
                 if (response.success) {
                     console.log('success');
                     AuthenticationService.SetCredentials(vm.username, vm.password);
                     console.log(response);
                     $scope.user = response.user;
                     $location.path('/');
                     $scope.actionTemplate="views/start-tour.html";
                 } else {
                   console.log('failure');
                     FlashService.Error(response.message);
                     vm.dataLoading = false;
                 }
             });
         };
     }
