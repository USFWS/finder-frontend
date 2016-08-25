(function () {
  'use strict';

  angular.module('frontendApp')
    .directive('speciesCategorizationList', function () {
      return {
        restrict: 'E',
        templateUrl: './species/speciesCategorizationList.html',
        scope: {
          species: '=',
          categories: '='
        },
        controller: function ($scope) {

          $scope.addCategory = function (species, category) {
            species.addCategory(category);
          };

          $scope.removeCategory = function (species, category) {
            species.removeCategory(category);
          };
        }
      };
    });
})();
