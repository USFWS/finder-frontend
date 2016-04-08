(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name frontendApp.SpeciesModel
   * @description
   * # A Model representing a species in the At Risk Species Finder
   * Service in the frontendApp.
   */

   function Model($http, API_URL, toastr) {
      var SpeciesModel = function (data) {
        this.id = data.id;
        this.scientificName = data.scientificName;
        this.commonName = data.commonName;
        this.taxon = data.taxon;
        this.leadOffice = data.leadOffice;
        this.range = data.range || [];
        this.status = data.status || [{}];
        this.updatedAt = data.updatedAt;
      };

      SpeciesModel.prototype.create = function () {
        return $http.post(API_URL + 'species', this)
          .then(function (response) {
            toastr.success('Successfully created ' + response.data.scientificName + '.');
          })
          .catch(function (response) {
            toastr.error(response.statusText, 'Could not add new species to the database.');
          });
      };

      SpeciesModel.prototype.update = function () {
        return $http.post(API_URL + 'species/' + this.id, this)
          .then(function (response) {
            toastr.success('Successfully created ' + response.data.scientificName + '.');
          })
          .catch(function (response) {
            toastr.error(response.statusText, 'Could not add new species to the database.');
          });
      };

      SpeciesModel.prototype.destroy = function () {
        var species = this;
        return $http.delete(API_URL + 'species/' + this.id)
          .then(function () {
            toastr.success('Successfully removed ' + species.scientificName + ' from the database.');
          })
          .catch(function (response) {
            toastr.error(response.statusText, 'Could not remove species from the database.');
          });
      };

      SpeciesModel.prototype.currentStatus = function () {
        var self = this;
        var currentStatus = self.status[0];
        angular.forEach(self.status, function(status) {
          if ( new Date(status.date) > new Date(currentStatus.date) ) {
            currentStatus = status;
          }
        });
        return currentStatus.name;
      };

      SpeciesModel.prototype.removeEmptyStatus = function () {
        var self = this;
        angular.forEach(self.status, function (status, i) {
          if ( !status.name && !status.date) {
            self.status.splice(i, 1);
          }
        });
      };

      SpeciesModel.prototype.validate = function () {
        var self = this;
        var lastStatus = self.status[self.status.length -1];
        delete self.id;
        if (self.range.length === 0) {
          toastr.error('You must specify at least one state for this specie\'s range.');
          return false;
        } else if (self.status.length === 1 && lastStatus.name === undefined && lastStatus.date === undefined) {
          toastr.error('You must specify at least one status to create a species.');
          return false;
        } else if (self.status.length > 1 && lastStatus.name === undefined && lastStatus.date === undefined) {
          self.status.pop();
        }
        return true;
      };

      SpeciesModel.prototype.alphabetizeRange = function () {
        return this.range.sort();
      };

      return SpeciesModel;
    }

    angular.module('frontendApp')
      .factory('SpeciesModel', Model);

})();
