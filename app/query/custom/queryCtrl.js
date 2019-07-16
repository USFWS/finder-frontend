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
    .controller('QueryCtrl', ['$scope', '$httpParamSerializerJQLike', 'Map', 'Query', 'PickList', 'landsList', 'officeList', 'User', function ($scope, $httpParamSerializerJQLike, Map, Query, PickList, landsList, officeList, User) {
      var clickHandler = false;
      $scope.mapDefaults = { scrollWheelZoom: false };
      $scope.officeList = officeList;
      $scope.landsList = landsList.data;
      $scope.statusList = PickList.STATUS_LIST;
      $scope.taxonList = PickList.TAXON_LIST;
      $scope.regionList = PickList.REGION_LIST;
      $scope.loading = { reset: false, query: false };
      $scope.query = { range: [], rangeQueryType: 'any' };
      $scope.csvData = false;
      $scope.center = {
        lat: 34.8934492,
        lng: -94.1480978,
        zoom: 3
      };

      $scope.isAdmin = function () {
        return User.isAdmin();
      }

      $scope.isEditor = function () {
        return User.isEditor();
      }

      function clickElement(el) {
        if (el.click) el.click();
        else if (document.createEvent) {
          var e = document.createEvent('HTMLEvents');
          e.initEvent('click', false, true);
          el.dispatchEvent(e);
        }
      }

      function getFileName() {
        var now = new Date();
        return "at-risk-species-finder-custom-query" + now
          .toISOString()
          .slice(0, 10)
          + '.csv';
      }

      function downloadCSV(species) {
        if (window.navigator.msSaveOrOpenBlob && window.Blob) {
          var blob = new Blob([species], { type: "text/csv" });
          navigator.msSaveOrOpenBlob(blob, getFileName());
        } else {
          var downloadLink = document.createElement('a');
          downloadLink.href = 'data:attachment/csv,' + encodeURI(species);
          downloadLink.target = '_blank';
          downloadLink.download = getFileName();
          downloadLink.className = 'btn btn-success btn-block';
          downloadLink.innerHTML = 'Download CSV';
          var submitButton = document.querySelector('button[type=submit]');
          var form = document.querySelector('form');
          form.insertBefore(downloadLink, submitButton);
          clickElement(downloadLink);
        }
      }

      $scope.queryDatabase = function () {
        $scope.loading.query = true;
        var query;
        if ($scope.query.offices) {
          var officeNames = $scope.query.offices.map(function (office) {
            return office.name;
          });
        }
        if ($scope.query.lands) {
          var landNames = $scope.query.lands.map(function (land) {
            return land.name;
          });
        }

        $scope.query.offices = officeNames;
        $scope.query.lands = landNames;
        query = $httpParamSerializerJQLike($scope.query);

        Query.custom(query)
          .then(function (species) {
            if (typeof species === 'string') {
              downloadCSV(species);
            }
            else $scope.results = species;
          }).finally(function () {
            $scope.loading.query = false;
          });
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
            $scope.$on('leafletDirectiveGeoJson.click', function (ev, payload) {
              Map.toggleState(payload, $scope.query.range).then(function (response) {
                $scope.query.range = response.range;
                Map.updateStyle(response.payload);
              });
            });
          }
        });
      };

      $scope.resetQuery = function () {
        $scope.loading.reset = true;
        $scope.query = { range: [], rangeQueryType: 'any', csv: false };
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
