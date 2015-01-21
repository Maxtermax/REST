'use strict';

describe('Service: Uregister', function () {

  // load the service's module
  beforeEach(module('meanApp'));

  // instantiate service
  var Uregister;
  beforeEach(inject(function (_Uregister_) {
    Uregister = _Uregister_;
  }));

  it('should do something', function () {
    expect(!!Uregister).toBe(true);
  });

});
