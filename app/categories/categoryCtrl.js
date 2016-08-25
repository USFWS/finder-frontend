(function () {
  'use strict';

  /**
   * @ngdoc function
   * @name frontendApp.controller:CategoryCreateCtrl
   * @description
   * # CategoryCreateCtrl
   * Controller of the frontendApp
   */
  angular.module('frontendApp')
    .controller('CategoriesCtrl', ['$scope', 'category', 'CategoryModel', function ($scope, category, CategoryModel) {
      if (category) $scope.category = category;
      else $scope.category = new CategoryModel({});

      $scope.create = function (category) {
        if ( category.validate() ) category.create();
        // We should really make sure we got a 201 response before clearing the form.
        $scope.category = new CategoryModel({});
      };

      $scope.update = function (category) {
        if ( category.validate() ) category.update();
      };

    }]);

})();
