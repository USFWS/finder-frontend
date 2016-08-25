(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name frontendApp.CategoryModel
   * @description
   * # A Model representing a species category of the At Risk Species Finder
   */
  angular.module('frontendApp')
    .factory('CategoryModel', ['$http', 'API_URL', 'toastr', function ($http, API_URL, toastr) {
      var CategoryModel = function(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.code = data.code;
      };

      CategoryModel.prototype.validate = function () {
        return true;
      };

      CategoryModel.prototype.create = function () {
        var self = this;
        return $http.post(API_URL + 'categories', self)
          .then(function () {
            toastr.success('Successfully created ' + self.name);
          })
          .catch(function (response) {
            var details = [];
            angular.forEach(response.data.invalidAttributes, function (invalid) {
              this.push(invalid[0].message);
            }, details);
            toastr.error(details.join('. '), response.statusText);
          });
      };

      CategoryModel.prototype.update = function () {
        var self = this;
        return $http.post(API_URL + 'categories/' + self.id, self)
          .then(function () {
            toastr.success('Successfully updated ' + self.name);
          })
          .catch(function (response) {
            var details = [];
            angular.forEach(response.data.invalidAttributes, function (invalid) {
              this.push(invalid[0].message);
            }, details);
            toastr.error(details.join('. '), response.statusText);
          });
      };

      CategoryModel.prototype.destroy = function () {
        var self = this;
        return $http.delete(API_URL + 'categories/' + self.id)
          .then(function () {
            toastr.success('Successfully deleted ' + self.name);
          })
          .catch(function (response) {
            var details = [];
            angular.forEach(response.data.invalidAttributes, function (invalid) {
              this.push(invalid[0].message);
            }, details);
            toastr.error(details.join('. '), response.statusText);
          });
      };

      return CategoryModel;
    }]);
})();
