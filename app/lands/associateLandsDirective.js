(function () {
  'use strict';

  angular.module('frontendApp')
    .directive('associateLands', ['Lands', '$http', 'API_URL', 'SpeciesLandsModel', 'toastr',
      function (Lands, $http, API_URL, SpeciesLandsModel, toastr) {
        return {
          restrict: 'E',
          templateUrl: './lands/associateLands.html',
          scope: {
            species: '=',
            lands: '=',
            codes: '='
          },
          controller: function ($scope) {
            $scope.speciesLandRecord = new SpeciesLandsModel({});

            $scope.updateLand = function(landId) {
              $scope.speciesLandRecord.land = landId;
            };

            $scope.updateSpecies = function(speciesId) {
              $scope.speciesLandRecord.species = speciesId;
              getSpeciesLandsData(speciesId);
            };

            $scope.updatePopulationCode = function(populationCode) {
              $scope.speciesLandRecord.population = populationCode;
            };

            $scope.createAssociation = function() {
              if ($scope.speciesLandRecord.validate()) {
                $scope.speciesLandRecord.create()
                  .then(function(response) {
                    toastr.success(response.statusText);
                    // Query the through association model
                    getSpeciesLandsData($scope.speciesLandRecord.species);
                  })
                  .catch(function(err) {
                    toastr.error(err.statusText, err.data);
                    getSpeciesLandsData($scope.speciesLandRecord.species);
                  });
              }
            };

            $scope.removeAssociation = function(association) {
              var model = new SpeciesLandsModel({ id: association.id });
              model.destroy()
                .then(function(res) {
                  toastr.success('Removed ' + association.name + '.');
                  getSpeciesLandsData($scope.speciesLandRecord.species);
                })
                .catch(function(res) {
                  toastr.error(res.statusText);
                });
            };

            function getSpeciesLandsData(speciesId) {
              var query = {
                "params": {
                  "where": {"species": speciesId}
                }
              };
              $http.get(API_URL + 'specieslands', query)
                .then(function(res) {
                  $scope.associatedLands = res.data.map(function(association) {
                    return {
                      id: association.id,
                      name: association.land.name,
                      agency: association.land.agency,
                      label: association.land.label,
                      population: association.population
                    }
                  });
                });

            }

          }
        };
    }]);
})();
