'use strict';

describe('Controller: SpecieslistCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var SpecieslistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SpecieslistCtrl = $controller('SpecieslistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
