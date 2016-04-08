'use strict';

describe('Controller: CreateSpeciesCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var CreateSpeciesCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateSpeciesCtrl = $controller('CreateSpeciesCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
