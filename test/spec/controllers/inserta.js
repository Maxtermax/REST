'use strict';

describe('Controller: InsertaCtrl', function () {

  // load the controller's module
  beforeEach(module('chatApp'));

  var InsertaCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    InsertaCtrl = $controller('InsertaCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
