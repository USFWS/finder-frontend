(function () {
  'use strict';

  angular.module('frontendApp')
    .directive('createLand', ['Lands', 'LandModel', 'toastr', function (Lands, LandModel, toastr) {
      return {
        restrict: 'E',
        templateUrl: './lands/createLand.html',
        scope: {
          species: '=',
          view: '=',
          lands: '='
        },
        controller: function ($scope) {
          $scope.land = new LandModel({});

          Lands.getPickList().then(function(data) {
            $scope.lands = data.sort(sortByName);
          });

          $scope.updateModel = function(selection) {
            $scope.land.name = selection.name;
            $scope.land.agency = selection.agency;
          }

          $scope.createLand = function(land) {
            if ( land.validate() ) {
              land.create()
                .then(function() {
                  $scope.land = new LandModel({});
                });
            }
          }

          function sortByName(a, b) {
            if (a.agency.toLowerCase() < b.agency.toLowerCase()) return -1;
            if (a.agency.toLowerCase() > b.agency.toLowerCase()) return 1;
            return 0;
          }

        }
      };
    }]);
})();
