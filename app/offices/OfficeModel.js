(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name frontendApp.OfficeModel
   * @description
   * # A Model representing a User of the At Risk Species Finder
   */
  angular.module('frontendApp')
    .factory('OfficeModel', ['$http', 'API_URL', 'toastr', function ($http, API_URL, toastr) {
      var OfficeModel = function(data) {
        this.id = data.id;
        this.name = data.name;
        this.adminRegion = data.adminRegion;
        this.street = data.street;
        this.city = data.city;
        this.state = data.state;
        this.zip = data.zip;
        this.email = data.email;
        this.phone = data.phone;
        this.url = data.url;
        this.species = data.species;
      };

      OfficeModel.prototype.validate = function () {
        return true;
      };

      OfficeModel.prototype.create = function () {
        var self = this;
        return $http.post(API_URL + 'offices', self)
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

      OfficeModel.prototype.update = function () {
        var self = this;
        return $http.post(API_URL + 'offices/' + self.id, self)
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

      OfficeModel.prototype.destroy = function () {
        var self = this;
        return $http.delete(API_URL + 'offices/' + self.id)
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

      OfficeModel.prototype.getLocation = function () {
        return [this.city, this.state].join(', ');
      };

      return OfficeModel;
    }]);
})();
