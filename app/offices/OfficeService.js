(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name frontendApp.Office
   * @description
   * # Office
   * Service in the frontendApp.
   */
  angular.module('frontendApp')
    .service('Office', ['$http', 'API_URL', 'OfficeModel', 'toastr', function ($http, API_URL, OfficeModel, toastr) {

      function getOffices() {
        return $http.get(API_URL + 'offices')
          .then(function (response) {
            var results = [];
            angular.forEach(response.data, function (office) {
              results.push( new OfficeModel(office) );
            });
            return results.sort(alphabetize);
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

      function alphabetize(a,b) {
        if (a.name < b.name) return -1;
        else if (a.name > b.name) return 1;
        else return 0;
      }

      return {
        getOffices: getOffices,
        getOffice: getOffice
      };
    }]);

})();
