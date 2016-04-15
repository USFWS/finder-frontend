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
    .controller('ProfileCtrl', ['$scope', 'User', 'currentUser', function ($scope, User, currentUser) {
      $scope.user = currentUser;

      $scope.update = function(user) {
        if ( user.validate() ) user.update();
      };

      $scope.isAdmin = function() {
        return User.isAdmin();
      };

      $scope.isEditor = function() {
        return User.isEditor();
      };
    }]);

})();
