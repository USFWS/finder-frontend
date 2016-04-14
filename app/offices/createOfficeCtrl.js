(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name frontendApp.controller:ProfileCtrl
   * @description
   * # ProfileCtrl
   * Controller of the frontendApp
   */
  angular.module('frontendApp')
    .controller('OfficeCreateCtrl', function ($scope, PickList, OfficeModel) {
      $scope.stateList = PickList.STATE_LIST;
      $scope.regionList = PickList.REGION_LIST;
      $scope.office = new OfficeModel({});

      $scope.create = function (office) {
        if ( office.validate() ) office.create();
        // We should really make sure we got a 201 response before clearing the form.
        $scope.office = new OfficeModel({});
      };
    });

})();
