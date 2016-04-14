(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name frontendApp.controller:HeaderCtrl
   * @description
   * # HeaderCtrl
   * Controller of the frontendApp
   */
  angular.module('frontendApp')
    .controller('HomeCtrl', function ($scope, SpeciesList, PickList) {
      $scope.species = {
        list: SpeciesList,
        listed: speciesByCategory(PickList.PROTECTED, SpeciesList),
        lessProtection: speciesByCategory(PickList.DOES_NOT_NEED_PROTECTION, SpeciesList)
      };

      angular.forEach(PickList.STATUS_LIST, function (status) {
        $scope.species[status] = speciesByStatus(status, SpeciesList);
      });
      console.log($scope.species);

      function speciesByCategory(category, list) {
        var filtered = [];
        angular.forEach(list, function (species) {
          if ( category.indexOf( species.currentStatus() ) > -1 )
            filtered.push(species);
        });
        return filtered;
      }

      function speciesByStatus(status, list) {
        var filtered = [];
        angular.forEach(list, function (species) {
          if ( status === species.currentStatus() ) filtered.push(species);
        });
        return filtered;
      }
    });
})();
