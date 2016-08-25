(function () {
  'use strict';

  angular.module('frontendApp')
    .directive('proposedDetermination', function () {
      return {
        restrict: 'E',
        templateUrl: './species/proposedDetermination.html',
        scope: {
          species: '='
        },
        controller: function ($scope) {
          $scope.determinationType = 1;

          $scope.radioChanged = function() {
            $scope.species.proposedDetermination = '';
          };
        }
      };
    });
})();
