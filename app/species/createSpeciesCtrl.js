'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:CreateSpeciesCtrl
 * @description
 * # CreateSpeciesCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('CreateSpeciesCtrl', function ($scope, SpeciesModel, Map, PickList, officeList) {
    var clickHandler = false;
    $scope.officeList = officeList.sort(alphabetize);
    $scope.taxonList = PickList.TAXON_LIST;
    $scope.statusList = PickList.STATUS_LIST;
    $scope.species = new SpeciesModel({});
    $scope.center = {
      lat: 34.8934492,
      lng: -94.1480978,
      zoom: 3
    };

    function alphabetize(a,b) {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    }

    $scope.create = function(species) {
      if ( species.validate() ) {
        species.create().then(function (response) {
          if (response.status === 201) {
            $scope.species = new SpeciesModel({});
            Map.clearStates($scope.geojson).then(function (response) {
              $scope.geojson = response.data;
              $scope.loadMap();
            });
          }
        });
      }
    };

    $scope.loadMap = function () {
      Map.getGeoJSON().then(function (response) {
        angular.extend($scope, {
          geojson: {
            data: response.data,
            style: Map.geoStyle
          }
        });
        if (!clickHandler) {
          clickHandler = true;
          $scope.$on('leafletDirectiveGeoJson.click', function(ev, payload) {
            Map.toggleState(payload, $scope.species.range).then(function (response) {
              $scope.species.range = response.range;
              Map.updateStyle(response.payload);
            });
          });
        }
      });
    };

    $scope.loadMap();
  });
