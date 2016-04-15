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
    .controller('QueryNonEndemicCtrl', ['$scope', 'Query', 'PickList', function ($scope, Query, PickList) {
      $scope.query = { type: 'and', nonEndemic: [] };
      $scope.stateList = PickList.STATE_LIST;
      $scope.loading = false;

      $scope.queryNonEndemic = function () {
        $scope.loading = true;
        Query.nonEndemic({ state: $scope.query.nonEndemic, type: $scope.query.type })
          .then(function (response) {
            $scope.results = response;
            $scope.query.terms = buildQueryString();
          })
          .finally(stopLoader);
      };

      function stopLoader () {
        $scope.loading = false;
      }

      function buildQueryString () {
        if ( $scope.query.nonEndemic.length > 0 )
          return 'Species Occurring in ' + $scope.query.nonEndemic.join(' ' + $scope.query.type + ' ');
        else return 'All Species Ocurring in More than One State';
      }
    }]);

})();
