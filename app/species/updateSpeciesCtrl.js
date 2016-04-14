'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:SpeciesCtrl
 * @description
 * # SpeciesCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('UpdateSpeciesCtrl',
    function ($scope, selectedSpecies, User, Map, PickList, officeList) {
      $scope.taxonList = PickList.TAXON_LIST;
      $scope.statusList = PickList.STATUS_LIST;
      $scope.officeList = officeList.sort(alphabetize);
      $scope.species = selectedSpecies;
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

    $scope.updateSpecies = function(species) {
      if ( species.validate() ) species.update();
    };

    $scope.isEditor = function() {
      return User.isEditor();
    };

    $scope.isAdmin = function() {
      return User.isAdmin();
    };

    $scope.loadMap = function() {
      Map.getStates($scope.species.range).then(function (response) {
        angular.extend($scope, {
          geojson: {
            data: response.data,
            style: Map.geoStyle
          }
        });
        $scope.$on('leafletDirectiveGeoJson.click', function(ev, payload) {
          Map.toggleState(payload, $scope.species.range).then(function (response) {
            $scope.species.range = response.range;
            Map.updateStyle(response.payload);
          });
        });
      });
    };

    $scope.loadMap();
  });
