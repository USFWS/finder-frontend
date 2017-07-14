(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name frontendApp.SpeciesLandsModel
   * @description
   * # A Model representing a the M:M join table between Species and Lands
   * Service in the frontendApp.
   */

   angular.module('frontendApp')
     .factory('SpeciesLandsModel', ['$http', 'API_URL', function ($http, API_URL) {
        var SpeciesLandsModel = function (data) {
          this.id = data.id;
          this.species = data.species;
          this.land = data.land;
          this.population = data.population;
        };

        SpeciesLandsModel.prototype.create = function() {
          return $http.post(API_URL + 'specieslands', this);
        };

        SpeciesLandsModel.prototype.destroy = function() {
          return $http.delete(API_URL + 'specieslands/' + this.id);
        };

        SpeciesLandsModel.prototype.validate = function () {
          if (typeof this.species !== 'string') return false;
          if (typeof this.land !== 'string') return false;
          return true;
        };

        return SpeciesLandsModel;
      }]);

})();
