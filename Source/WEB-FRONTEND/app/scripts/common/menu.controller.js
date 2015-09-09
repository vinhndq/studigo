'use strict';
angular.module('studigoApp').controller('MenuCtrl',['$scope','$modal','$route','AuthenticationService','$location', function ($scope, $modal, $route,AuthenticationService,$location) {

  $scope.openLoginDialog = function () {

    var modalInstance = $modal.open({
      templateUrl: 'login-dialog.html',
      controller: 'LoginCtrl',
      windowClass: 'login-dialog'
    });

    modalInstance.result.then(function () {
      loginForm.username="";
      loginForm.password="";
      $scope.isValid = true;
    });
  };

  $scope.logout = function()
  {
    console.log("do logout");
    AuthenticationService.ClearCredentials();
    $location.path('/welcome-page');
    console.log($scope.globals);
  };
}]);
