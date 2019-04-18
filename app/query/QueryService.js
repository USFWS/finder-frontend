(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name frontendApp.query
   * @description
   * # query
   * Service in the frontendApp.
   */
  angular.module('frontendApp')
    .service('Query', ['$http', 'API_URL', 'SpeciesModel', 'toastr', function ($http, API_URL, SpeciesModel, toastr) {

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

      function pacificRegion() {
        return $http.get(API_URL + 'species?where={"range": ["Idaho","Oregon","Washington","Hawaii"]}')
          .then(onSuccess)
          .catch(function (response) {
            toastr.error(response.statusText, 'Query for species from a Pacific state failed.');
          });
      }

      function southwestRegion() {
        return $http.get(API_URL + 'species?where={"range": ["Arizona","New Mexico","Oklahoma","Texas"]}')
          .then(onSuccess)
          .catch(function (response) {
            toastr.error(response.statusText, 'Query for species from a Southwestern state failed.');
          });
      }

      function midwestRegion() {
        return $http.get(API_URL + 'species?where={"range": ["Illinois","Indiana","Iowa","Michigan","Missouri","Minnesota","Ohio","Wisconsin"]}')
          .then(onSuccess)
          .catch(function (response) {
            toastr.error(response.statusText, 'Query for species from a Southwestern state failed.');
          });
      }

      function southeastRegion() {
        return $http.get(API_URL + 'species?where={"range": ["Alabama","Arkansas","Florida","Georgia","Kentucky","Louisiana","Mississippi","North Carolina","South Carolina","Tennessee","Puerto Rico","U.S. Virgin Islands"]}')
          .then(onSuccess)
          .catch(function (response) {
            toastr.error(response.statusText, 'Query for species from a Southeastern state failed.');
          });
      }

      function northeastRegion() {
        return $http.get(API_URL + 'species?where={"range": ["Connecticut","Delaware","Maine","Maryland","Massachusetts","New Hampshire","New Jersey","New York","Pennsylvania","Rhode Island","Vermont","Virginia","West Virginia"]}')
          .then(onSuccess)
          .catch(function (response) {
            toastr.error(response.statusText, 'Query for species from a Northeastern state failed.');
          });
      }

      function mountainPrairieRegion() {
        return $http.get(API_URL + 'species?where={"range": ["Colorado","Kansas","Montana","North Dakota","Nebraska","South Dakota","Utah","Wyoming"]}')
          .then(onSuccess)
          .catch(function (response) {
            toastr.error(response.statusText, 'Query for species from a Mountain Prairie state failed.');
          });
      }

      function alaskaRegion() {
        return $http.get(API_URL + 'species?where={"range": ["Alaska"]}')
          .then(onSuccess)
          .catch(function (response) {
            toastr.error(response.statusText, 'Query for species from Alaska failed.');
          });
      }

      function pacificSouthwestRegion() {
        return $http.get(API_URL + 'species?where={"range": ["Nevada","California"]}')
          .then(onSuccess)
          .catch(function (response) {
            toastr.error(response.statusText, 'Query for species from the Pacific Southwest failed.');
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
        if (typeof response.data === 'string') return response.data;
        var results = [];
        angular.forEach(response.data, function (animal) {
          results.push( new SpeciesModel(animal) );
        });
        if (results.length === 0) toastr.info('Query did not return any At-Risk species.');
        toastr.success('Query returned ' + results.length + ' At-Risk species.');
        return results;
      }

      return {
        otherRegion: otherRegion,
        pacificRegion: pacificRegion,
        southwestRegion: southwestRegion,
        midwestRegion: midwestRegion,
        southeastRegion: southeastRegion,
        northeastRegion: northeastRegion,
        mountainPrairieRegion: mountainPrairieRegion,
        alaskaRegion: alaskaRegion,
        pacificSouthwestRegion: pacificSouthwestRegion,
        nonEndemic: nonEndemic,
        endemic: endemic,
        status: status,
        custom: custom
      };
    }]);

})();
