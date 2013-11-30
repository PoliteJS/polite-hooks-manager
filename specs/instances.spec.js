/**
 * Test Singleton VS Multi Instance Behavior
 *
 *
 *
 */

var Singleton = require('../index');


describe('Singleton VS Multi Instance', function() {

	beforeEach(function() {
		Singleton.init();
	});


	describe('Singleton', function() {

		Singleton.register('foo', function() {
			console.log('cb1', arguments);
		});

		Singleton.setDefaultPriority(50);

		Singleton.register('foo', function() {
			console.log('cb2', arguments);
		});

		Singleton.call('foo', 1, 2);

	});



});
