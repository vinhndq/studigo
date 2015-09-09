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

     LoginController.$inject = ['$scope','$modalInstance','$location', 'AuthenticationService', 'FlashService'];
     function LoginController($scope,$modalInstance,$location, AuthenticationService, FlashService) {
         var vm = this;



         (function initController() {
             // reset login status
             AuthenticationService.ClearCredentials;
         })();
         $scope.isValid = true;
         $scope.login = function (form) {
             console.log('before login');
             console.log(form);
             if(form.$valid)
             {
               vm.dataLoading = true;
               AuthenticationService.Login($scope.username, $scope.password, function (response) {
                   if (response.success) {
                    $scope.isValid = true;
                    AuthenticationService.SetCredentials(vm.username, vm.password);
                    $scope.user = response.user;
                    $modalInstance.close();
                    $location.path('/');

                   } else {
                    $scope.isValid = false;
                    $scope.error="";
                    vm.dataLoading = false;
                   }
               });
             }
             else {
               console.log('form invalid');
             }
         };
     }
