'use strict';
angular.module('studigoApp').controller('WelcomePageCtrl',function ($scope,$location) {

  $scope.doStartTour = function () {
    $scope.isFirstStep = true;
    $location.path('/start-tour/');
  };
});
