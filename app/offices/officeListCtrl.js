(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name frontendApp.controller:OfficeListCtrl
   * @description
   * # ProfileCtrl
   * Controller of the frontendApp
   */
  angular.module('frontendApp')
    .controller('OfficeListCtrl', ['$scope', 'officeList', 'User', function ($scope, officeList, User) {
      $scope.offices = officeList;

      $scope.isAdmin = function() {
        return User.isAdmin();
      };

      $scope.isEditor = function() {
        return User.isEditor();
      };

      $scope.remove = function (office) {
        var index = $scope.offices.indexOf(office);
        $scope.offices.splice(index, 1);
        office.destroy();
      };
    }]);

})();
