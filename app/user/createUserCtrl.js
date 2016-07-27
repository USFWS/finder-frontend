(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name frontendApp.controller:CreateUserCtrl
   * @description
   * # UserAdminCtrl
   * Controller of the frontendApp
   */
  angular.module('frontendApp')
    .controller('CreateUserCtrl', ['$scope', 'UserModel', function ($scope, UserModel) {
      $scope.user = new UserModel({});
      $scope.user.accountType = 'viewer';

      $scope.create = function(user) {
        if ( user.validate() ) {
          user.create().then(function (response) {
            console.log(response);
            if (response.status === 201) {
              $scope.user = new UserModel({});
            }
          });
        }
      };

    }]);
})();
