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
    .controller('QueryStatusCtrl', ['$scope', 'Query', 'PickList', '$httpParamSerializerJQLike', function ($scope, Query, PickList, $httpParamSerializerJQLike) {
      $scope.query = {};
      $scope.statusList = PickList.STATUS_LIST;
      $scope.loading = false;

      $scope.queryStatus = function() {
        $scope.loading = true;
        Query.status($httpParamSerializerJQLike({ status: $scope.query.status }))
          .then(function (result) {
            $scope.results = result;
            $scope.query.terms = 'At-Risk Species with current status: ' + $scope.query.status.join(' OR ');
          })
          .finally(stopLoader);
      };

      function stopLoader() {
        $scope.loading = false;
      }

    }]);

})();
