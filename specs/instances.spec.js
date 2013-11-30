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


	it('Singleton', function() {

		var ctx = {
			tot: 0
		};

		Singleton.setContext(ctx);
		/*
		Singleton.register('foo', function(p) {
			p.a++;
			p.b--;
			this.getContext().tot += 1;
			console.log('cb1');
		});

		Singleton.register('foo', function(p) {
			console.log('cb2');
			this.getContext().tot++;
			p.a++;
			p.b--;
		});

		Singleton.register({
			name: 'foo',
			fn: function() {
				console.log('cb3');
			},
			after: function() {
				console.log('after cb3', this.hasStopped());
			}
		});


		var obj1 = {
			a: 0,
			b: 0
		};

		Singleton.call('foo', obj1);

		console.log(obj1, ctx);
		*/
		/*
		Singleton.register('foo', function() {
			var done = this.async();
			setTimeout(function() {
				console.log('cb1');
				done();
			}, 100);
		});

		Singleton.register('foo', function() {
			console.log('cb2');
		});

		Singleton.register('foo', function() {
			console.log('cb3');
		});

		Singleton.run('foo', function() {
			console.log('--- end async run');
			callback();
		});
		*/


	});



});