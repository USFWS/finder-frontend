(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name frontendApp.controller:OfficeDetailCtrl
   * @description
   * # ProfileCtrl
   * Controller of the frontendApp
   */
  angular.module('frontendApp')
    .controller('OfficeDetailCtrl', ['$scope', 'theOffice', '$state', 'SpeciesModel', function ($scope, theOffice, $state, SpeciesModel) {
      $scope.office = theOffice;
      $scope.species = [];

      angular.forEach(theOffice.species, function (species) {
        $scope.species.push( new SpeciesModel(species) );
      });

      $scope.currentStatus = function(species) {
        return species.currentStatus();
      }

      $scope.destroy = function (office) {
        office.destroy();
        $state.go('office.list');
      };
    }]);

})();
