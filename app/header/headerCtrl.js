'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('HeaderCtrl', function ($scope, $state, $auth, toastr, User) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.isAdmin = function() {
      return User.isAdmin();
    };

    $scope.isEditor = function() {
      return User.isEditor();
    };

    $scope.getId = function () {
      return User.getUserId();
    };

    $scope.logout = function() {
      $auth.logout();
      $auth.removeToken();
      toastr.success('You have successfully logged out.');
    };

    $scope.login = function() {
      $auth.authenticate('google').then( function (response) {
        $auth.setToken(response.data.token);
        User.login();
        toastr.success('Welcome, ' + User.getUsername() + '!', 'Login Successful');
        $state.go('species.list');
      }).catch( function (response) {
        toastr.error('Could not log you in.', response.data);
      });
    };
  });
