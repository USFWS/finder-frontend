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
    .controller('QueryEndemicCtrl', ['$scope', 'Query', 'PickList', 'User', function ($scope, Query, PickList, User) {
      $scope.query = {};
      $scope.stateList = PickList.STATE_LIST;
      $scope.loading = false;

      $scope.isAdmin = function() {
        return User.isAdmin();
      }

      $scope.isEditor = function() {
        return User.isEditor();
      }

      $scope.queryEndemic = function() {
        $scope.loading = true;
        Query.endemic({ state: $scope.query.endemic })
          .then(function (species) {
            $scope.results = species;
            $scope.query.terms = buildSearchTermString();
          })
          .finally(function () {
            $scope.loading = false;
          });
      };

      function buildSearchTermString() {
        if ( !angular.isArray($scope.query.endemic) )
          return 'All endemic species (only occur in one state)';
        else
          return 'Endemic species (occur in only one state): ' + $scope.query.endemic.join(' OR ');
      }

    }]);

})();
