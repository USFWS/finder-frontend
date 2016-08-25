(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name frontendApp.CategoryService
   * @description
   * # CategoryService
   * Service in the frontendApp.
   */
  angular.module('frontendApp')
    .service('Category', ['$http', 'API_URL', 'CategoryModel', 'toastr', function ($http, API_URL, CategoryModel, toastr) {

      function getCategories() {
        return $http.get(API_URL + 'categories')
          .then(function (response) {
            var results = [];
            angular.forEach(response.data, function (category) {
              results.push( new CategoryModel(category) );
            });
            return results.sort(alphabetize);
          })
          .catch(function (response) {
            toastr.error(response.statusText, 'Could not download categories.');
          });
      }

      function getCategory(id) {
        return $http.get(API_URL + 'categories/' + id)
          .then(function (response) {
            return new CategoryModel(response.data);
          })
          .catch(function (response) {
            toastr.error(response.statusText, 'Could not download category.');
          });
      }

      function alphabetize(a,b) {
        if (a.name < b.name) return -1;
        else if (a.name > b.name) return 1;
        else return 0;
      }

      return {
        getCategories: getCategories,
        getCategory: getCategory
      };
    }]);

})();
