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
    .controller('QueryCtrl', function ($scope, $httpParamSerializerJQLike, Map, Query, toastr, SpeciesModel, PickList) {
      var clickHandler = false;
      $scope.statusList = PickList.STATUS_LIST;
      $scope.taxonList = PickList.TAXON_LIST;
      $scope.loading = { reset: false, query: false };
      $scope.query = { range: [], rangeQueryType: 'any' };
      $scope.center = {
        lat: 34.8934492,
        lng: -94.1480978,
        zoom: 3
      };

      $scope.queryDatabase = function() {
        var query = $httpParamSerializerJQLike($scope.query);
        $scope.loading.query = true;

        Query.custom(query).then(function (response) {
          $scope.results = [];
          angular.forEach(response.data, function(animal) {
            $scope.results.push( new SpeciesModel(animal) );
          });
          if (response.data.length === 0){
            toastr.info(response.statusText, 'No results found.');
          } else {
            toastr.success(response.statusText, response.data.length + ' Results Found!');
          }
        }).catch(function (response) {
          toastr.error(response.statusText, 'Query unsuccessful.');
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

      $scope.getQuery = function () {
        console.log($scope.query);
        var searchTerms = [];
        if ($scope.query.status) searchTerms.push($scope.query.status);
        if ($scope.query.taxon) searchTerms.push($scope.query.taxon);
        if ($scope.query.office) searchTerms.push($scope.query.office);
        if ($scope.query.range.length > 0) {
          searchTerms.push('Range: ');
          angular.forEach($scope.query.range, function (state) {
            searchTerms.push(state);
          });
        }
        return searchTerms.join(' ');
      };
    });
})();
