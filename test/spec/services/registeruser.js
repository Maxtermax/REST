'use strict';

describe('Service: registerUser', function () {

  // load the service's module
  beforeEach(module('meanApp'));

  // instantiate service
  var registerUser;
  beforeEach(inject(function (_registerUser_) {
    registerUser = _registerUser_;
  }));

  it('should do something', function () {
    expect(!!registerUser).toBe(true);
  });

});
