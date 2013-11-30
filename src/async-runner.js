/**
 * RUN TASKS - ASYNCHRONOUS
 * (responsability library)
 */


// Global Dependencies
var async = require('async');

// Internal Dependencies
var getHookTasks = require('./libs/hook-tasks-lists');
var AsyncContext = require('./libs/context-async');

var MissingHookNameError = require('./errors/missing-hook-name');
var StopException = require('./errors/stop-exception');





module.exports.run = function() {
	return this.executeAsyncStuff('eachSeries', Array.prototype.slice.call(arguments));
};

module.exports.parallel = function() {
	return this.executeAsyncStuff('each', Array.prototype.slice.call(arguments));
};



module.exports.executeAsyncStuff = function(mode, args) {

	if (!args.length) {
		throw new MissingHookNameError('you can\'t run anything without a hookName!');
	} else {
		var hookName = args.shift();
	}

	if (this.store[hookName]) {

		if (args.length && typeof args[args.length - 1] === 'function') {
			var callback = args[args.length - 1];
		} else {
			var callback = function() {};
		}

		var tasks = getHookTasks(this.store[hookName]);
		var ctx = AsyncContext.create(this.context);


		// BEFORE
		tasks.before.forEach(function(fn) {
			fn.apply(ctx, args);
		});

		// AFTER
		var eachSeriesCallback = function() {
			console.log(ctx.hasStopped());
			tasks.after.forEach(function(fn) {
				fn.apply(ctx, args);
			});
			callback();
		}

		// RUN ASYNC
		// "mode" define if to run series or parallel
		// callbacks should be both sync or async
		async[mode](tasks.fn, function(fn, done) {

			try {
				var result = fn.apply(ctx.setCallback(done), args);
			} catch(e) {
				if (!e instanceof StopException) {
					throw e;
				} else {
					result = false;
				}
			}

			if (ctx.sync) {
				if (result === false) {
					eachSeriesCallback();
				} else {
					done(result);
				}
			}

		}, eachSeriesCallback);

	}

	return this;
};