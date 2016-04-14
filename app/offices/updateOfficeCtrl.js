(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name frontendApp.controller:OfficeUpdateCtrl
   * @description
   * # ProfileCtrl
   * Controller of the frontendApp
   */
  angular.module('frontendApp')
    .controller('OfficeUpdateCtrl', function ($scope, theOffice, PickList) {
      $scope.office = theOffice;
      $scope.stateList = PickList.STATE_LIST;
      $scope.regionList = PickList.REGION_LIST;

      $scope.update = function (office) {
        if (office.validate()) office.update();
      };
    });

})();
