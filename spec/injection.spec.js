var jasny = require('../src');

describe('injection', function () {

  it('basic dependency injection', function (next) {
    var server = new jasny.Server();
    expect(function () {
      server.di.register('test', {
        inject: [{'abc': 'abc'}],
        ready: function () {
          expect(this.abc).toBe('Hello World');
          next();
        }
      });
      server.di.register('abc', 'Hello World');
    }).not.toThrow();
  });

});