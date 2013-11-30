/**
 * Unregister Hooks Callbacks
 */

var PoliteHooksManager = require('../index');

var MissingHookNameError = require('../src/errors/missing-hook-name');


function objectLength(obj) {
	var i = 0;
	for (prop in obj) {
		i++;
	}
	return i;
};

describe('Unregister Hook Callback', function() {

	var hooksManager = null;

	var hooks = [{
		name: 'foo',
		fn: function() {}
	},{
		id: 'id1',
		name: 'foo',
		group: 'group1',
		fn: function() {}
	},{
		id: 'id1',
		name: 'faa',
		group: 'group1',
		fn: function() {}
	}];

	beforeEach(function() {
		hooksManager = PoliteHooksManager.getNewInstance();
		hooks.forEach(function(hookConfig) {
			hooksManager.register(hookConfig);
		});
	});


	it('"unregister()" should throw missin name error', function() {
		expect(function() {
			hooksManager.unregister();
		}).to.throw(MissingHookNameError);
	});

	it('should unregister existing hook name', function() {
		hooksManager.unregister('foo');
		expect(hooksManager.store).to.not.have.property('foo');
	});

	it('should unregister non-existing hook name', function() {
		expect(
			hooksManager.unregister('non-existsnt')
		).to.equal(hooksManager);
	});

	it('should unregister existing hook name and id', function() {
		hooksManager.unregister('foo', 'id1');
		expect(hooksManager.store['foo']).to.not.have.property('id1');
	});

	it('should unregister hooks by group name', function() {
		hooksManager.unregisterGroup('group1');
		expect(hooksManager.store).to.not.have.property('faa');
		expect(hooksManager.store['foo']).to.not.have.property('id1');
	});
});