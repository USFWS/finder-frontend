'use strict';

describe('Controller: UserAdminCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var UserAdminCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UserAdminCtrl = $controller('UserAdminCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
