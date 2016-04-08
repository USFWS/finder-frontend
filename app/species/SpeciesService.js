'use strict';

/**
 * @ngdoc service
 * @name frontendApp.species
 * @description
 * # species
 * Service in the frontendApp.
 */
angular.module('frontendApp')
  .service('Species', function ($http, API_URL, toastr, SpeciesModel) {

    function getSpecies() {
      return $http.get(API_URL + 'species?sort=range+ASC')
        .then(function (response) {
          var species = [];
          angular.forEach(response.data, function (animal) {
            species.push( new SpeciesModel(animal) );
          });
          return species;
        })
        .catch(function (response) {
          toastr.error(response.statusText, 'Could not download species list.');
        });
    }

    function getOne(id) {
      return $http.get(API_URL + 'species/' + id)
      .then(function (response) {
          return new SpeciesModel(response.data);
      })
        .catch(function (response) {
          toastr.error(response.statusText, 'Could not retrieve species.');
        });
    }

    function create(species) {
      return $http.post(API_URL + 'species', species)
        .then(function () {
          toastr.success('Successfully created ' + species.commonName + '.');
        })
        .catch(function (response) {
          toastr.error(response.statusText, 'Could not create species.');
        });
    }

    function update(species) {
      return $http.post(API_URL + 'species/' + species.id, species)
        .then(function () {
          toastr.success('Successfully updated ' + species.commonName + '.');
        })
        .catch(function (response) {
          toastr.error(response.statusText, 'Could not updated species.');
        });
    }

    function destroy(species) {
      return $http.delete(API_URL + 'species/' + species)
        .then(function () {
          toastr.success('Successfully removed ' + species.commonName + '.');
        })
        .catch(function (response) {
          toastr.error(response.statusText, 'Could not delete species.');
        });
    }

    function alphabetizeRange(species) {
      angular.forEach(species, function(animal) {
        animal.range.sort();
      });
      return species;
    }

    return {
      getSpecies: getSpecies,
      getOne: getOne,
      create: create,
      update: update,
      destroy: destroy,
      alphabetizeRange: alphabetizeRange
    };
  });
