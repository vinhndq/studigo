'use strict';

/**
 * @ngdoc function
 * @name studigoApp.controller:MainCtrl
 * @description
 * # LoginCtrl
 * Controller of the studigoApp
 */
 angular
         .module('studigoApp')
         .controller('LoginCtrl', LoginController);

     LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
     function LoginController($location, AuthenticationService, FlashService) {
         var vm = this;

         vm.login = login;

         (function initController() {
             // reset login status
             AuthenticationService.ClearCredentials();
         })();

         function login() {
             vm.dataLoading = true;
             AuthenticationService.Login(vm.username, vm.password, function (response) {
                 if (response.success) {
                     AuthenticationService.SetCredentials(vm.username, vm.password);
                     $location.path('/');
                 } else {
                     FlashService.Error(response.message);
                     vm.dataLoading = false;
                 }
             });
         };
     }
