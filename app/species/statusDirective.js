(function () {
  'use strict';

  angular.module('frontendApp')
    .directive('speciesStatus', ['toastr', function (toastr) {
      return {
        restrict: 'E',
        templateUrl: '/species/statusTemplate.html',
        scope: {
          statuses: '=',
          options: '='
        },
        controller: function ($scope) {

          $scope.addStatus = function () {
            var valid = true;
            angular.forEach($scope.statuses, function (status) {
              if ( !isValid(status) ) valid = false;
            });
            if (valid) $scope.statuses.push({});
          };

          $scope.removeStatus = function (index) {
            if ($scope.statuses.length === 1) {
              toastr.warning('A species must have at least one status');
              return;
            }
            $scope.statuses.splice(index, 1);
          };

          function isValid(status) {
            var dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            var urlRegex = /\(?(?:(http|https):\/\/)(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/;
            var isValidStatus = $scope.options.indexOf(status.name) > -1;
            var isValidDate = dateRegex.test(status.date);
            var isValidUrl = urlRegex.test(status.url);

            if ( status.url && !isValidUrl ) toastr.warning('Please include a valid URL');
            if (!isValidStatus) toastr.warning('Please select a status from the drop-down menu');
            if (!isValidDate) toastr.warning('Please select a date from the calendar. Format is [YYYY-MM-DD].');
            return ( isValidStatus && isValidDate );
          }
        }
      };
    }]);
})();
