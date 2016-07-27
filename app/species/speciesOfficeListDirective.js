(function () {
  'use strict';

  angular.module('frontendApp')
    .directive('speciesOfficeList', function () {
      return {
        restrict: 'E',
        templateUrl: './species/speciesOfficeList.html',
        scope: {
          species: '=',
          offices: '='
        },
        controller: function ($scope) {

          $scope.addOffice = function (species, office) {
            species.offices.push(office);
          };

          $scope.removeOffice = function (species, office) {
            var index = species.offices.indexOf(office);
            species.offices.splice(index, 1);
          };
        }
      };
    });
})();
