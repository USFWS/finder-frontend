(function () {
  'use strict';

  angular.module('frontendApp')
    .service('Lands', ['$http', 'API_URL', 'toastr', function ($http, API_URL, toastr) {

      function getPickList() {
        return $http.get('./data/pad-us-unique.js')
          .then(function(response) {
            return response.data;
          })
          .catch(function(response) {
            toastr.error(response.statusText, 'Could not download protected lands picklist.');
            return response;
          });
      }

      function getLands(query) {
        query = { params: query } || {};
        return $http.get(API_URL + 'lands/', query);
      }

      function getOne(id) {
        return $http.get(API_URL + 'lands/' + id)
        .then(function (response) {
            return response.data;
        })
        .catch(function (response) {
          toastr.error(response.statusText, 'Could not retrieve lands.');
        });
      }

      function create(land) {
        return $http.post(API_URL + 'lands', land)
          .then(function (response) {
            toastr.success('Successfully created ' + land.name + '.');
            return response;
          })
          .catch(function (response) {
            toastr.error(response.statusText, 'Could not create protected land.');
            return response;
          });
      }

      function update(land) {
        return $http.post(API_URL + 'lands/' + land.id, land)
          .then(function (response) {
            toastr.success('Successfully updated ' + land.name + '.');
            return response;
          })
          .catch(function (response) {
            toastr.error(response.statusText, 'Could not updated protected land.');
            return response;
          });
      }

      function destroy(land) {
        return $http.delete(API_URL + 'lands/' + land)
          .then(function (response) {
            toastr.success('Successfully removed ' + land.name + '.');
            return response;
          })
          .catch(function (response) {
            toastr.error(response.statusText, 'Could not delete protected land.');
            return response;
          });
      }

      return {
        getPickList: getPickList,
        getLands: getLands,
        getOne: getOne,
        create: create,
        update: update,
        destroy: destroy
      };
    }]);

})();
