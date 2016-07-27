(function () {
  'use strict';

  /**
   * @ngdoc service
   * @name frontendApp.User
   * @description
   * # User
   * Service in the frontendApp.
   */
  angular.module('frontendApp')
    .service('User', ['$http', 'API_URL', '$auth', 'toastr', 'UserModel', function ($http, API_URL, $auth, toastr, UserModel) {
      var payload, authenticated;
      login();

      function login() {
         payload = $auth.getPayload();
         authenticated = $auth.isAuthenticated();
      }

      function getUsers() {
        return $http.get(API_URL + 'user')
          .then(function (response) {
            var users = [];
            angular.forEach(response.data, function (user) {
              users.push( new UserModel(user) );
            });
            return users;
          })
          .catch(function (response) {
            toastr.error(response.statusText, 'Could not download user list.');
            return response;
          });
      }

      function getUser(id) {
        return $http.get(API_URL + 'user/' + id)
          .then(function (response) {
            return new UserModel(response.data);
          })
          .catch(function (response) {
            toastr.error(response.statusText, 'Could not download user.');
            return response;
          });
      }

      function destroy(id) {
        return $http.delete(API_URL + 'user/' + id)
          .catch(function (response) {
            toastr.error(response.statusText, 'Could not delete user.');
            return response;
          });
      }

      function update(user, id) {
        return $http.post(API_URL + 'user/' + id, user)
          .catch(function (response) {
            toastr.error(response.statusText, 'Could not update user list.');
            return response;
          });
      }

      function isEditor() {
        if (authenticated) {
          return  payload.act === 'editor';
        }
      }

      function isAdmin() {
        if (authenticated) {
          return  payload.act === 'admin';
        }
      }

      function getUserId() {
        if (authenticated) {
          return payload.sub;
        }
      }

      function getUsername() {
        return payload.name || '';
      }

      return {
        login: login,
        getUsers: getUsers,
        getUser: getUser,
        getUserId: getUserId,
        destroy: destroy,
        update: update,
        isEditor: isEditor,
        isAdmin: isAdmin,
        getUsername: getUsername
      };
    }]);

})();
