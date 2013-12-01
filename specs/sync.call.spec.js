
var PoliteHooksManager = require('../index');

describe('SYNC call()', function() {

	var hooksManager = null;

	beforeEach(function() {
		hooksManager = PoliteHooksManager.getNewInstance();
	});


	it('should run sync calls', function() {
		var tot = 0;
		hooksManager
			.register('foo', function() {
				tot++;
			})
			.register('foo', function() {
				tot++;
			});

		hooksManager.call('foo');
		expect(tot).to.equal(2);
	});


	it('should manipulate given context', function() {

		var ctx = {
			tot: 0
		};

		hooksManager
			.register('foo', function() {
				this.context.tot++
			})
			.register('foo', function() {
				this.getContext().tot++
			});

		hooksManager
			.setContext(ctx)
			.call('foo');

		expect(ctx.tot).to.equal(2);

	});


	it('should manipulate argument list', function() {
		hooksManager
			.register('foo', function(arg) {
				arg.push('cb1');
			})
			.register('foo', function(arg) {
				arg.push('cb2');
			});

		var argumentList = [];
		hooksManager.call('foo', argumentList);
		expect(argumentList).to.deep.equal(['cb1','cb2']);
	});


	it('should manipulate argument object', function() {
		hooksManager
			.register('foo', function(arg) {
				arg['cb1'] = true;
			})
			.register('foo', function(arg) {
				arg['cb2'] = true;
			});

		var argumentObject = {};
		hooksManager.call('foo', argumentObject);
		expect(argumentObject).to.deep.equal({
			cb1: true,
			cb2: true
		});
	});


	it('should run callbacks sorted by priority', function() {
		var cb1 = sinon.spy();
		var cb2 = sinon.spy();

		hooksManager
			.register({
				name: 'foo',
				priority: 10,
				fn: cb1
			})
			.register({
				name: 'foo',
				priority: 20,
				fn: cb2
			})
			.call('foo');

		expect(cb2.calledBefore(cb1)).to.be.true;
	});

});


