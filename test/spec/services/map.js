'use strict';

describe('Service: Map', function () {

  // load the service's module
  beforeEach(module('frontendApp'));

  // instantiate service
  var Map;
  beforeEach(inject(function (_Map_) {
    Map = _Map_;
  }));

  it('should do something', function () {
    expect(!!Map).toBe(true);
  });

});
