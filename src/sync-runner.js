/**
 * RUN TASKS - SYNCHRONOUS
 * (responsability library)
 */

// Internal Dependencies
var getHookTasks = require('./libs/hook-tasks-lists');
var SyncContext = require('./libs/context-sync');

var MissingHookNameError = require('./errors/missing-hook-name');
var StopException = require('./errors/stop-exception');





/**
 * Launch hook callbacks with synchronous behavior
 */
module.exports.call = function(hookName) {

	if (!hookName) {
		throw new MissingHookNameError('you can\'t "call()" without a hookName!');
	}

	if (this.store[hookName]) {

		// compose arguments list
		var args = Array.prototype.slice.call(arguments);
		args.shift();

		// compose execution context
		var ctx = SyncContext.create();
		ctx.setContext(this.context);

		// compose sorted tasks
		var tasks = getHookTasks(this.store[hookName]);

		// BEFORE
		tasks.before.forEach(callback);

		// cycle through task lists
		// (handle a stop request)
		try {
			tasks.fn.forEach(callback);
		} catch(e) {
			if (!e instanceof StopException) {
				throw e;
			}
		}

		// AFTER
		tasks.after.forEach(callback);

		function callback(fn) {
			fn.apply(ctx, args);
		}

	}

	return this;
};




