(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name frontendApp.controller:OfficeDetailCtrl
   * @description
   * # ProfileCtrl
   * Controller of the frontendApp
   */
  angular.module('frontendApp')
    .controller('OfficeDetailCtrl', ['$scope', 'theOffice', '$state', function ($scope, theOffice, $state) {
      $scope.office = theOffice;

      $scope.destroy = function (office) {
        office.destroy();
        $state.go('office.list');
      };
    }]);

})();
