'use strict';

/**
 * @ngdoc service
 * @name frontendApp.Office
 * @description
 * # Office
 * Service in the frontendApp.
 */
angular.module('frontendApp')
  .service('Office', function ($http, API_URL) {

    function getOffices() {
      return $http.get(API_URL + 'offices');
    }

    function getOffice(id) {
      return $http.get(API_URL + 'offices/' + id);
    }

    return {
      getOffices: getOffices,
      getOffice: getOffice
    };
  });
