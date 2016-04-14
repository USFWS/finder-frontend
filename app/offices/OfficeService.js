'use strict';

/**
 * @ngdoc service
 * @name frontendApp.Office
 * @description
 * # Office
 * Service in the frontendApp.
 */
angular.module('frontendApp')
  .service('Office', function ($http, API_URL, OfficeModel, toastr) {

    function getOffices() {
      return $http.get(API_URL + 'offices')
        .then(function (response) {
          var results = [];
          angular.forEach(response.data, function (office) {
            results.push( new OfficeModel(office) );
          });
          return results;
        })
        .catch(function (response) {
          toastr.error(response.statusText, 'Could not download offices.');
        });
    }

    function getOffice(id) {
      return $http.get(API_URL + 'offices/' + id)
        .then(function (response) {
          return new OfficeModel(response.data);
        })
        .catch(function (response) {
          toastr.error(response.statusText, 'Could not download office.');
        });
    }

    return {
      getOffices: getOffices,
      getOffice: getOffice
    };
  });
