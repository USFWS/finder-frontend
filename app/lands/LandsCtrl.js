(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name frontendApp.controller:LandsCtrl
   * @description
   * # LandsCtrl
   * Controller of the frontendApp
   */
  angular.module('frontendApp')
    .controller('LandsCtrl', ['$scope', 'landsList', 'speciesList', 'PickList',
      function ($scope, landsList, speciesList, PickList) {
        $scope.lands = landsList.data;
        $scope.species = speciesList.sort(sortByName);
        $scope.codes = PickList.POPULATION_CODES;

        function sortByName(a, b) {
          if (a.fullName().toLowerCase() < b.fullName().toLowerCase()) return -1;
          if (a.fullName().toLowerCase() > b.fullName().toLowerCase()) return 1;
          return 0;
        }

      }]);

})();
