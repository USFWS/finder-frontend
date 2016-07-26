(function () {
  'use strict';
  var API_URL = 'http://localhost:1337/';
  // var API_URL = 'https://finder.royhewitt.com/';

  angular.module('frontendApp')
    .constant('API_URL', API_URL)
    .config(['$urlRouterProvider', '$stateProvider', '$authProvider', 'toastrConfig', function($urlRouterProvider, $stateProvider, $authProvider, toastrConfig) {
      $urlRouterProvider.otherwise('/species/list');

      $stateProvider

        .state('home', {
          url: '/',
          templateUrl: 'home/main.html',
          controller: 'HomeCtrl',
          resolve: {
            SpeciesList: function (Species) {
              return Species.getSpecies();
            }
          }
        })

        .state('species', {
          url: '/species',
          templateUrl: 'species/main.html'
        })

        .state('species.summary', {
          url: '/summary',
          templateUrl: 'species/summary.html',
          controller: 'SpeciesListCtrl',
          resolve: {
            SpeciesList: function(Species) {
              return Species.getSpecies();
            }
          }
        })

        .state('species.list', {
          url: '/list',
          templateUrl: 'species/list.html',
          controller: 'SpeciesListCtrl',
          resolve: {
            SpeciesList: function(Species) {
              return Species.getSpecies();
            }
          }
        })

        .state('species.create', {
          url: '/create',
          templateUrl: 'species/create.html',
          controller: 'CreateSpeciesCtrl',
          resolve: {
            officeList: function(Office) {
              return Office.getOffices();
            }
          }
        })

        .state('species.update', {
          url: '/update/:id',
          templateUrl: 'species/update.html',
          controller: 'UpdateSpeciesCtrl',
          resolve: {
            theSpecies: function(Species, $stateParams) {
              return Species.getOne($stateParams.id);
            },
            officeList: function(Office) {
              return Office.getOffices();
            }
          }
        })

        .state('species.detail', {
          url: '/:id',
          templateUrl: 'species/detail.html',
          controller: 'SpeciesCtrl',
          resolve: {
            theSpecies: function(Species, $stateParams) {
              return Species.getOne($stateParams.id);
            }
          }
        })

        .state('query', {
          url: '/query',
          templateUrl: 'query/main.html'
        })

        .state('query.list', {
          url: '/list',
          templateUrl: 'query/list.html',
          controller: 'QueryListCtrl'
        })

        .state('query.endemic', {
          url: '/endemic',
          templateUrl: 'query/endemic/endemic.html',
          controller: 'QueryEndemicCtrl'
        })

        .state('query.non-endemic', {
          url: '/non-endemic',
          templateUrl: 'query/nonEndemic/non-endemic.html',
          controller: 'QueryNonEndemicCtrl'
        })

        .state('query.non-southeast', {
          url: '/non-southeast',
          templateUrl: 'query/region/non-southeast.html',
          controller: 'QueryNonSoutheastCtrl'
        })

        .state('query.status', {
          url: '/status',
          templateUrl: 'query/byStatus/status.html',
          controller: 'QueryStatusCtrl'
        })

        .state('query.custom', {
          url: '/custom',
          templateUrl: 'query/custom/custom.html',
          controller: 'QueryCtrl',
          resolve: {
            officeList: function (Office) {
              return Office.getOffices();
            }
          }
        })

        .state('user', {
          url: '/user',
          templateUrl: 'user/main.html'
        })

        .state('user.create', {
          url: '/create',
          templateUrl: 'user/create.html',
          controller: 'CreateUserCtrl'
        })

        .state('user.profile', {
          url: '/profile',
          templateUrl: 'user/profile.html',
          controller: 'ProfileCtrl',
          resolve: {
            currentUser: function (User, $stateParams) {
              return User.getUser($stateParams.id);
            }
          }
        })

        .state('user.update', {
          url: '/update/:id',
          templateUrl: 'user/profile.html',
          controller: 'ProfileCtrl',
          resolve: {
            currentUser: function(User, $stateParams) {
              return User.getUser($stateParams.id);
            }
          }
        })

        .state('user.admin', {
          url: '/admin',
          templateUrl: 'user/admin.html',
          controller: 'UserAdminCtrl',
          resolve: {
            allUsers: function(User) {
              return User.getUsers();
            }
          }
        })

        .state('offices', {
          url: '/offices',
          templateUrl: 'offices/main.html'
        })

        .state('offices.create', {
          url: '/create',
          templateUrl: 'offices/create.html',
          controller: 'OfficeCreateCtrl'
        })

        .state('offices.detail', {
          url: '/detail/:id',
          templateUrl: 'offices/detail.html',
          controller: 'OfficeDetailCtrl',
          resolve: {
            theOffice: function(Office, $stateParams) {
              return Office.getOffice($stateParams.id);
            }
          }
        })

        .state('offices.update', {
          url: '/update/:id',
          templateUrl: 'offices/update.html',
          controller: 'OfficeUpdateCtrl',
          resolve: {
            theOffice: function(Office, $stateParams) {
              return Office.getOffice($stateParams.id);
            }
          }
        })

        .state('offices.list', {
          url: '/list',
          templateUrl: 'offices/list.html',
          controller: 'OfficeListCtrl',
          resolve: {
            officeList: function (Office) {
              return Office.getOffices();
            }
          }
        });

      $authProvider.loginUrl = API_URL + 'auth/login';
      $authProvider.registerUrl = API_URL + 'auth/register';
      $authProvider.google({
        url: API_URL + 'auth/google',
        redirectUri: 'https://www.fws.gov/southeast/candidateconservation/finder2/',
        clientId: '302206927623-uvp8uhlid7kj6a7hcpsa3rugipluouc9.apps.googleusercontent.com'
      });

      angular.extend(toastrConfig, {
        positionClass: 'toast-top-left'
      });

    }]);

})();
