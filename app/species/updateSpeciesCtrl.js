(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name frontendApp.controller:SpeciesCtrl
   * @description
   * # SpeciesCtrl
   * Controller of the frontendApp
   */
  angular.module('frontendApp')
    .controller('UpdateSpeciesCtrl', ['$scope', 'theSpecies', 'User', 'PickList', 'officeList', 'userList', 'categoryList',
      function ($scope, theSpecies, User, PickList, officeList, userList, categoryList) {
        $scope.categories = categoryList;
        $scope.taxonList = PickList.TAXON_LIST;
        $scope.statusList = PickList.STATUS_LIST;
        $scope.stateList = PickList.STATE_LIST;
        $scope.userList = userList;
        $scope.officeList = officeList;
        $scope.species = theSpecies;
        $scope.center = {
          lat: 34.8934492,
          lng: -94.1480978,
          zoom: 3
        };

      $scope.updateSpecies = function(species) {
        if ( species.validate() ) species.update();
      };

      $scope.isEditor = function() {
        return User.isEditor();
      };

      $scope.isAdmin = function() {
        return User.isAdmin();
      };

      $scope.isRangeEditor = function() {
        return User.isRangeEditor();
      }
    }]);

})();
