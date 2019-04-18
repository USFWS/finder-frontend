(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name frontendApp.controller:CreateSpeciesCtrl
   * @description
   * # CreateSpeciesCtrl
   * Controller of the frontendApp
   */
  angular.module('frontendApp')
    .controller('CreateSpeciesCtrl', ['$scope', 'SpeciesModel', 'PickList', 'officeList', 'userList', 'categoryList',
      function ($scope, SpeciesModel, PickList, officeList, userList, categoryList) {
      $scope.categories = categoryList;
      $scope.officeList = officeList;
      $scope.userList = userList;
      $scope.taxonList = PickList.TAXON_LIST;
      $scope.statusList = PickList.STATUS_LIST;
      $scope.stateList = PickList.STATE_LIST;
      $scope.species = new SpeciesModel({});
      $scope.center = {
        lat: 34.8934492,
        lng: -94.1480978,
        zoom: 3
      };

      $scope.create = function(species) {
        if ( species.validate() ) {
          species.create().then(function (response) {
            if (response.status === 201) {
              $scope.species = new SpeciesModel({});
              Map.clearStates($scope.geojson).then(function (response) {
                $scope.geojson = response.data;
                $scope.loadMap();
              });
            }
          });
        }
      };
    }]);

})();
