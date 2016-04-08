'use strict';

describe('Controller: PremadeQueryCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var PremadeQueryCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PremadeQueryCtrl = $controller('PremadeQueryCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(PremadeQueryCtrl.awesomeThings.length).toBe(3);
  });
});
