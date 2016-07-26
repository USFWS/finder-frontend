(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name frontendApp.SpeciesModel
   * @description
   * # A Model representing a species in the At Risk Species Finder
   * Service in the frontendApp.
   */

   angular.module('frontendApp')
     .factory('SpeciesModel', ['$http', 'API_URL', 'toastr', function ($http, API_URL, toastr) {
        var SpeciesModel = function (data) {
          this.id = data.id;
          this.scientificName = data.scientificName;
          this.commonName = data.commonName;
          this.taxon = data.taxon;
          this.offices = data.offices || [];
          this.range = data.range || [];
          this.status = data.status || [{}];
          this.updatedAt = data.updatedAt;
        };

        SpeciesModel.prototype.create = function () {
          return $http.post(API_URL + 'species', this)
            .then(function (response) {
              toastr.success('Successfully created ' + response.data.scientificName + '.');
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

        SpeciesModel.prototype.update = function () {
          delete this.leadOffice;
          return $http.put(API_URL + 'species/' + this.id, this)
            .then(function (response) {
              console.log(response.data);
              toastr.success('Successfully updated ' + response.data.scientificName + '.');
            })
            .catch(function (response) {
              var details = [];
              angular.forEach(response.data.invalidAttributes, function (invalid) {
                this.push(invalid[0].message);
              }, details);
              toastr.error(details.join('. '), response.statusText);
            });
        };

        SpeciesModel.prototype.destroy = function () {
          var species = this;
          return $http.delete(API_URL + 'species/' + this.id)
            .then(function () {
              toastr.success('Successfully removed ' + species.scientificName + ' from the database.');
            })
            .catch(function (response) {
              var details = [];
              angular.forEach(response.data.invalidAttributes, function (invalid) {
                this.push(invalid[0].message);
              }, details);
              toastr.error(details.join('. '), response.statusText);
            });
        };

        SpeciesModel.prototype.associateOffice = function (office) {
          var self = this;
          return $http.post(API_URL + 'species/' + self.id + '/offices/' + office.id)
            .then(function (response) {
              toastr.success('Successfully associated ' + self.scientificName + ' with ' + office.name + '.');
              return new SpeciesModel(response.data);
            })
            .catch(function (response) {
              toastr.error(response.statusText, 'Could not associate ' + self.scientificName + ' with ' + office.name + '.');
            });
        };

        SpeciesModel.prototype.removeAssociatedOffice = function (office) {
          var self = this;
          return $http.delete(API_URL + 'species/' + self.id + '/offices/' + office.id)
            .then(function (response) {
              toastr.success('Successfully removed association between ' + self.scientificName + ' and ' + office.name + '.');
              return new SpeciesModel(response.data);
            })
            .catch(function (response) {
              toastr.error(response.statusText, 'Could not remove associattion between ' + self.scientificName + ' and ' + office.name + '.');
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

        SpeciesModel.prototype.getLeadOfficeId = function () {
          if ( this.office.length === 1 ) return this.office[0].id;
          else {
            return this.mostRecentOffice().id;
          }
        };

        SpeciesModel.prototype.getLeadOfficeName = function () {
          var offices = [];
          if ( this.offices.length === 0 ) return 'No lead office specified';
          if ( this.offices.length === 1 ) return this.offices[0].name;
          else {
            angular.forEach(this.offices, function (office) {
              offices.push(office.name);
            });
            return offices.join(', ');
          }
        };

        SpeciesModel.prototype.mostRecentOffice = function () {
          var mostRecent = this.office[0];
          angular.forEach(this.office, function (office) {
            if (new Date(mostRecent.updatedAt) < new Date(office.updatedAt) )
              mostRecent = office;
          });
          return mostRecent;
        };

        SpeciesModel.prototype.validate = function () {
          var self = this;
          var lastStatus = self.status[self.status.length -1];
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
      }]);

})();
