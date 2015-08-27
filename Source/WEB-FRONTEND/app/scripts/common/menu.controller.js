angular.module('studigoApp').controller('MenuCtrl', function ($scope, $modal, $log) {

  $scope.openLoginDialog = function () {

    var modalInstance = $modal.open({
      templateUrl: 'login-dialog.html',
      controller: 'LoginCtrl',
      windowClass: 'login-dialog'
    });

    modalInstance.result.then(function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

});
