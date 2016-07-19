(function () {
  'use strict';

  angular.module('frontendApp')
    .directive('createSpeciesOfficeList', function () {
      return {
        restrict: 'E',
        templateUrl: './species/createSpeciesOfficeList.html',
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
