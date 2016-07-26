(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name frontendApp.UserModel
   * @description
   * # A Model representing a User of the At Risk Species Finder
   */
  angular.module('frontendApp')
    .factory('UserModel', ['$http', 'API_URL', 'toastr', function ($http, API_URL, toastr) {
      var UserModel = function(data) {
        this.id = data.id;
        this.email = data.email;
        this.accountType = data.accountType;
        this.job = data.job;
        this.phone = data.phone;
        this.organization = data.organization
        this.updatedAt = data.updatedAt;
      };

      UserModel.prototype.create = function () {
        var self = this;
        return $http.post(API_URL + 'user', self)
          .then(function (response) {
            toastr.success('Successfully created new user ' + self.email + '.');
            return response;
          })
          .catch(function (response) {
            var details = [];
            angular.forEach(response.data.invalidAttributes, function (invalid) {
              this.push(invalid[0].message);
            }, details);
            toastr.error(details.join('. '), response.statusText);
          });
      };

      UserModel.prototype.delete = function () {
        var self = this;
        return $http.delete(API_URL + 'user/' + self.id)
          .then(function () {
            toastr.success('Successfully deleted user ' + self.email + '.');
          })
          .catch(function (response) {
            var details = [];
            angular.forEach(response.data.invalidAttributes, function (invalid) {
              this.push(invalid[0].message);
            }, details);
            toastr.error(details.join('. '), response.statusText);
          });
      };

      UserModel.prototype.update = function () {
        var self = this;
        return $http.post(API_URL + 'user/' + self.id, self)
          .then(function () {
            toastr.success('Successfully updated user ' + self.email + '.');
          })
          .catch(function (response) {
            var details = [];
            angular.forEach(response.data.invalidAttributes, function (invalid) {
              this.push(invalid[0].message);
            }, details);
            toastr.error(details.join('. '), response.statusText);
          });
      };

      UserModel.prototype.validate = function () {
        var emailRegex = /^([a-z0-9_\.-]+\@[\da-z\.-]+\.[a-z\.]{2,6})$/gm;
        var isValidEmail = emailRegex.test(this.email);
        if (!isValidEmail) {
          toastr.error('You must specify a valid email.');
          return false;
        } else {
          return true;
        }
      };

      UserModel.prototype.isAdmin = function () {
        return this.accountType.toLowerCase() === 'admin';
      };

      UserModel.prototype.isEditor = function () {
        return this.accountType.toLowerCase() === 'editor';
      };

      return UserModel;
    }]);

})();
