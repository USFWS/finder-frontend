'use strict';

describe('Service: species', function () {

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var species;
  beforeEach(inject(function (_species_) {
    species = _species_;
  }));

  it('should do something', function () {
    expect(!!species).toBe(true);
  });

});
