(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name frontendApp.controller:CategoryListCtrl
   * @description
   * # CategoryListCtrl
   * Controller of the frontendApp
   */
  angular.module('frontendApp')
    .controller('CategoryListCtrl', ['$scope', 'categoryList', 'User', function ($scope, categoryList, User) {
      $scope.categories = categoryList;

      $scope.isAdmin = function() {
        return User.isAdmin();
      };

      $scope.remove = function (category) {
        var index = $scope.categories.indexOf(category);
        $scope.categories.splice(index, 1);
        category.destroy();
      };
    }]);

})();
