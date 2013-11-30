/**
 * Register Hooks Callbacks
 */

var PoliteHooksManager = require('../index');


var MissingHookNameError = require('../src/errors/missing-hook-name');
var MissingHookFnError = require('../src/errors/missing-hook-fn');

describe('Register Hook Callback', function() {

	var hooksManager = null;

	beforeEach(function() {
		hooksManager = PoliteHooksManager.getNewInstance();
	});





	it('throw "missing hook name" exception', function() {
		expect(function() {
			hooksManager.register();
		}).to.throw(MissingHookNameError);
	});

	it('throw "missing hook fn" exception', function() {
		expect(function() {
			hooksManager.register({
				name: 'foo'
			});
		}).to.throw(MissingHookFnError);
	});




	it('should register a callback from configuration', function() {
		hooksManager.register({
			name: 'foo',
			fn: function() {}
		});
		expect(hooksManager.store).to.have.property('foo');
	});

	it('should register a callback by arguments', function() {
		hooksManager.register('foo', function() {});
		expect(hooksManager.store).to.have.property('foo');
	});





});