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
    .controller('SpeciesByRegionCtrl', ['$scope', 'Query', 'PickList', 'User', function ($scope, Query, PickList, User) {
      $scope.regions = PickList.REGION_LIST;
      $scope.regions.pop();
      $scope.loading = false;
      $scope.query = {};
      $scope.region = 'Southeast';

      $scope.isEditor = function() {
        return User.isEditor();
      };
      $scope.isAdmin = function() {
        return User.isAdmin();
      };

      $scope.submit = function() {
        $scope.loading = true;
        var functionName = camelize($scope.region).replace('-', '') + "Region";
        Query[functionName]()
          .then(function (species) {
            $scope.results = species;
            $scope.query.terms = 'Species that occurr in at least one state from the ' + $scope.region + ' region';
          })
          .finally(stopLoader);
      };

      function stopLoader () {
        $scope.loading = false;
      }

      function camelize(str) {
        return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
          if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
          return index == 0 ? match.toLowerCase() : match.toUpperCase();
        });
      }

    }]);

})();
