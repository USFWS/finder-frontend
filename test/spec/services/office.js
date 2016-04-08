'use strict';

describe('Service: Office', function () {

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var Office;
  beforeEach(inject(function (_Office_) {
    Office = _Office_;
  }));

  it('should do something', function () {
    expect(!!Office).toBe(true);
  });

});
