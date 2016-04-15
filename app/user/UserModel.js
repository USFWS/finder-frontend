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
        this.updatedAt = data.updatedAt;
      };

      UserModel.prototype.create = function () {
        var self = this;
        return $http.post(API_URL + 'user', self)
          .then(function () {
            toastr.success('Successfully created new user ' + self.email + '.');
          })
          .catch(function (response) {
            toastr.error(response.statusText, 'Could not create new user.');
          });
      };

      UserModel.prototype.delete = function () {
        var self = this;
        return $http.delete(API_URL + 'user/' + self.id)
          .then(function () {
            toastr.success('Successfully deleted user ' + self.email + '.');
          })
          .catch(function (response) {
            toastr.error(response.statusText, 'Could not delete user.');
          });
      };

      UserModel.prototype.update = function () {
        var self = this;
        return $http.post(API_URL + 'user/' + self.id, self)
          .then(function () {
            toastr.success('Successfully updated user ' + self.email + '.');
          })
          .catch(function (response) {
            toastr.error(response.statusText, 'Could not update user.');
          });
      };

      UserModel.prototype.validate = function () {
        var validTypes = ['admin', 'editor', 'viewer'];
        var emailRegex = /^([a-z0-9_\.-]+\@[\da-z\.-]+\.[a-z\.]{2,6})$/gm;
        var isValidEmail = emailRegex.test(this.email);
        var isValidType = validTypes.indexOf(this.accountType) > -1;
        if (!isValidEmail) {
          toastr.error('You must specify a valid email.');
          return false;
        } else if (!isValidType) {
          toastr.error('You chose an invalid account type.');
        }
        return true;
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
