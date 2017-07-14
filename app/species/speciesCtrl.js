(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name frontendApp.controller:SpecieslistCtrl
   * @description
   * # SpecieslistCtrl
   * Controller of the frontendApp
   */
  angular.module('frontendApp')
    .controller('SpeciesCtrl', ['$scope', 'theSpecies', 'Map', '$state', 'associatedLands',
      function ($scope, theSpecies, Map, $state, associatedLands) {
        $scope.associatedLands = associatedLands;
        $scope.species = theSpecies;
        $scope.mapDefaults = { scrollWheelZoom: false };
        $scope.center = {
          lat: 34.8934492,
          lng: -94.1480978,
          zoom: 3
        };

        $scope.destroy = function (species) {
          species.destroy();
          $state.go('species.list');
        };

        $scope.loadMap = function() {
          Map.getStates($scope.species.range).then(function (response) {
            angular.extend($scope, {
              geojson: {
                data: response.data,
                style: Map.geoStyle
              }
            });
          });
        };

        $scope.loadMap();

      }]);

})();
