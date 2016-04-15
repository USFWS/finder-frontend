(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name frontendApp.controller:QueryCtrl
   * @description
   * # QueryCtrl
   * Controller of the frontendApp
   */
  angular.module('frontendApp')
    .controller('QueryCtrl', ['$scope', '$httpParamSerializerJQLike', 'Map', 'Query', 'PickList', 'officeList', function ($scope, $httpParamSerializerJQLike, Map, Query, PickList, officeList) {
      var clickHandler = false;
      $scope.officeList = officeList;
      $scope.statusList = PickList.STATUS_LIST;
      $scope.taxonList = PickList.TAXON_LIST;
      $scope.regionList = PickList.REGION_LIST;
      $scope.loading = { reset: false, query: false };
      $scope.query = { range: [], rangeQueryType: 'any' };
      $scope.center = {
        lat: 34.8934492,
        lng: -94.1480978,
        zoom: 3
      };

      $scope.queryDatabase = function() {
        var query;
        var officeNames = [];
        $scope.loading.query = true;

        angular.forEach($scope.query.offices, function (office) {
          officeNames.push(office.name);
        });
        $scope.query.offices = officeNames;
        query = $httpParamSerializerJQLike($scope.query);

        Query.custom(query)
          .then(function (species) {
            $scope.results = species;
          }).finally(function() {
            $scope.loading.query = false;
          });
      };

      $scope.loadMap = function() {
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
              Map.toggleState(payload, $scope.query.range).then(function (response) {
                $scope.query.range = response.range;
                Map.updateStyle(response.payload);
              });
            });
          }
        });
      };

      $scope.resetQuery = function() {
        $scope.loading.reset = true;
        $scope.query = { range: [], rangeQueryType: 'any' };
        Map.clearStates($scope.geojson).then(function (response) {
          $scope.geojson = response.data;
          $scope.loadMap();
          $scope.results = null;
          $scope.loading.reset = false;
        });
      };

      $scope.loadMap();
    }]);
})();
