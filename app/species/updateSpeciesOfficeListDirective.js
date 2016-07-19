(function () {
  'use strict';

  angular.module('frontendApp')
    .directive('updateSpeciesOfficeList', function () {
      return {
        restrict: 'E',
        templateUrl: './species/updateSpeciesOfficeList.html',
        scope: {
          species: '=',
          offices: '='
        },
        controller: function ($scope) {

          $scope.associateOffice = function (species, office) {
            species.associateOffice(office)
              .then(function (species) {
                $scope.species = species;
              });
          };

          $scope.removeAssociatedOffice = function (species, office) {
            species.removeAssociatedOffice(office)
              .then(function (species) {
                $scope.species = species;
              });
          };
        }
      };
    });
})();
