
var PoliteHooksManager = require('../index');

describe('ASYNC run()', function() {

	var hooksManager = null;

	var syncCallback = null;
	var syncSpy01 = null;
	var syncSpy02 = null;
	var syncSpy03 = null;

	var asyncCallback = null;
	var asyncSpy01 = null;
	var asyncSpy02 = null;
	var asyncSpy03 = null;

	beforeEach(function() {
		hooksManager = PoliteHooksManager.getNewInstance();

		syncCallback = function() {
			return;
		};

		syncSpy01 = sinon.spy(syncCallback);
		syncSpy02 = sinon.spy(syncCallback);
		syncSpy03 = sinon.spy(syncCallback);

		asyncCallback = function() {
			var done = this.async();
			setTimeout(done, 1);
		};

		asyncSpy01 = sinon.spy(asyncCallback);
		asyncSpy02 = sinon.spy(asyncCallback);
		asyncSpy03 = sinon.spy(asyncCallback);

	});


	describe('synchronous callbacks', function() {

		it('should run callbacks with natural priority order (FIFO)', function() {
			hooksManager
				.register('foo', syncSpy01)
				.register('foo', syncSpy02)
				.run('foo');

			expect(syncSpy01.calledBefore(syncSpy02)).to.be.true;
		});

		it('should run full prioritized callbacks - higher priority run first', function() {
			hooksManager
				.register({
					name: 'foo',
					priority: 1,
					fn: syncSpy01
				})
				.register({
					name: 'foo',
					priority: 2,
					fn: syncSpy02
				})
				.run('foo');

			expect(syncSpy01.calledAfter(syncSpy02)).to.be.true;
		});

	});


	describe('asynchronous callbacks', function() {

		it('should run callbacks with natural priority order (FIFO)', function(done) {
			hooksManager
				.register('foo', asyncSpy01)
				.register('foo', asyncSpy02)
				.run('foo', function() {
					expect(asyncSpy01.calledBefore(asyncSpy02)).to.be.true;
					done();
				});
		});

		it('should run full prioritized callbacks - higher priority run first', function(done) {
			hooksManager
				.register({
					name: 'foo',
					priority: 1,
					fn: syncSpy01
				})
				.register({
					name: 'foo',
					priority: 2,
					fn: syncSpy02
				})
				.run('foo', function() {
					expect(syncSpy01.calledAfter(syncSpy02)).to.be.true;
					done();
				});
		});

	});


});


