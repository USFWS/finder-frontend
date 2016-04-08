'use strict';

/**
 * @ngdoc service
 * @name frontendApp.query
 * @description
 * # query
 * Service in the frontendApp.
 */
angular.module('frontendApp')
  .service('Query', function ($http, API_URL, SpeciesModel, toastr) {

    function status(theStatus) {
      return $http.get(API_URL + 'query/status?' + theStatus)
        .then(onSuccess)
        .catch(function (response) {
          toastr.error(response.statusText, 'Query on current status failed.');
        });
    }

    function endemic(state) {
      return $http.post(API_URL + 'query/endemic', state)
        .then(onSuccess)
        .catch(function (response) {
          toastr.error(response.statusText, 'Query for endemic species failed.');
        });
    }

    function nonEndemic(state) {
      return $http.post(API_URL + 'query/non-endemic', state)
        .then(onSuccess)
        .catch(function (response) {
          toastr.error(response.statusText, 'Query for species with range including more than one state failed.');
        });
    }

    function otherRegion() {
      return $http.get(API_URL + 'query/other-region')
        .then(onSuccess)
        .catch(function (response) {
          toastr.error(response.statusText, 'Query for species led by a Region other than the Southeast failed');
        });
    }

    function custom(query) {
      return $http.get(API_URL + 'query/custom?' + query)
        .then(onSuccess)
        .catch(function (response) {
          toastr.error(response.statusText, 'Custom query failed.');
        });
    }

    function onSuccess(response) {
      var results = [];
      angular.forEach(response.data, function (animal) {
        results.push( new SpeciesModel(animal) );
      });
      toastr.success('Query returned ' + results.length + ' At-Risk species.');
      return results;
    }

    return {
      otherRegion: otherRegion,
      nonEndemic: nonEndemic,
      endemic: endemic,
      status: status,
      custom: custom
    };
  });
