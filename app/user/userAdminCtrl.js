(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name frontendApp.controller:UserAdminCtrl
   * @description
   * # UserAdminCtrl
   * Controller of the frontendApp
   */
  angular.module('frontendApp')
    .controller('UserAdminCtrl', ['$scope', 'allUsers', function ($scope, allUsers) {
      $scope.users = allUsers;
      $scope.query = '';

      $scope.destroy = function (user) {
        var index = $scope.users.indexOf(user);
        $scope.users.splice(index, 1);
        user.delete();
      };
    }]);

})();
