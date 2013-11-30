/**
 * RUN TASKS - SYNCHRONOUS
 * (responsability library)
 */

var MissingHookNameError = require('./errors/missing-hook-name');

var getHookTasks = require('./libs/hook-tasks-lists');


module.exports.call = function(hookName) {

	if (!hookName) {
		throw new MissingHookNameError('you can\'t "call()" without a hookName!');
	}

	if (this.store[hookName]) {

		// compose arguments list
		var args = Array.prototype.slice.call(arguments);
		args.shift();

		getHookTasks(this.store[hookName]).fn.forEach(function(fn) {
			fn.apply(null, args);
		});

	}

	return this;
};




