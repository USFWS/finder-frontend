(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name frontendApp.LandModel
   * @description
   * # A Model representing a protected land in the At Risk Species Finder
   * Service in the frontendApp.
   */

   angular.module('frontendApp')
     .factory('LandModel', ['Lands', 'API_URL', 'toastr', function (Lands, API_URL, toastr) {
        var LandModel = function (data) {
          this.id = data.id;
          this.agency = data.agency;
          this.name = data.name;
          this.label = data.label || null;
          this.custom = data.custom || false;
          this.notes = data.notes;
          this.updatedAt = data.updatedAt;
        };

        LandModel.prototype.create = function() { return Lands.create(this); };
        LandModel.prototype.update = function() { return Lands.update(this); };
        LandModel.prototype.destroy = function() { return Lands.destroy(this); };

        LandModel.prototype.validate = function () {
          if (this.name === undefined) return false;
          if (this.agency === undefined) return false;
          return true;
        };

        return LandModel;
      }]);

})();
