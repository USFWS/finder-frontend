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
    .controller('SpeciesCtrl', function ($scope, theSpecies, Map) {

      $scope.species = theSpecies;
      $scope.center = {
        lat: 34.8934492,
        lng: -94.1480978,
        zoom: 3
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

    });

})();
