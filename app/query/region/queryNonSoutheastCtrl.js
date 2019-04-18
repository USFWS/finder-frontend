(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name frontendApp.controller:QueryCtrl
   * @description
   * # QueryCtrl
   * Controller of the frontendApp
   */
  angular.module('frontendApp')
    .controller('QueryNonSoutheastCtrl', ['$scope', 'Query', 'PickList', 'User', function ($scope, Query, PickList, User) {
      $scope.query = { type: 'and', nonEndemic: [] };
      $scope.stateList = PickList.STATE_LIST;
      $scope.loading = false;

      $scope.isAdmin = function() {
        return User.isAdmin();
      }

      $scope.isEditor = function() {
        return User.isEditor();
      }

      $scope.otherRegion = function() {
        $scope.loading = true;
        Query.otherRegion()
          .then(function (species) {
            $scope.results = species;
            $scope.query.terms = 'Species that will be Addressed by a Region other than the Southeast';
          })
          .finally(stopLoader);
      };

      function stopLoader () {
        $scope.loading = false;
      }

    }]);

})();
