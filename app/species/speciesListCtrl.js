(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name frontendApp.controller:SpecieslistCtrl
   * @description
   * # SpecieslistCtrl
   * Controller of the frontendApp
   */
  angular.module('frontendApp')
    .controller('SpeciesListCtrl', ['$scope', 'User', 'SpeciesList', function ($scope, User, SpeciesList) {
      $scope.species = SpeciesList;

      $scope.isAdmin = function() {
        return User.isAdmin();
      };

      $scope.isEditor = function() {
        return User.isEditor() || User.isRangeEditor();
      };

      $scope.remove = function(species) {
        var index = $scope.species.indexOf(species);
        $scope.species.splice(index, 1);
        species.destroy();
      };

    }]);

})();
