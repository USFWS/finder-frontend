(function () {
  'use strict';

  angular.module('frontendApp')
    .directive('speciesExpertList', function () {
      return {
        restrict: 'E',
        templateUrl: './species/speciesExpertList.html',
        scope: {
          species: '=',
          users: '='
        },
        controller: function ($scope) {

          $scope.addExpert = function (species, user) {
            species.experts.push(user);
          };

          $scope.removeExpert = function (species, user) {
            var index = species.experts.indexOf(user);
            species.experts.splice(index, 1);
          };
        }
      };
    });
})();
