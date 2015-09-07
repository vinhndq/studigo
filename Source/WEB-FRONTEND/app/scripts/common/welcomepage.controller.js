'use strict';
angular.module('studigoApp').controller('WelcomePageCtrl',function ($scope,$location) {

  $scope.doStartTour = function () {

    $location.path('/start-tour/first-step/');
  };
});
