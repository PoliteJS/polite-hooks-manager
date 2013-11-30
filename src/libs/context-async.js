/**
 * Asynchronous Execution Context
 *
 */

var StopException = require('../errors/stop-exception');

module.exports = require('./context');

module.exports.ContextClass.init = function(context) {
	this.context = context;
	this.stopped = false;
	this.sync = true;
	this.callback = null;
	return this;
};

module.exports.ContextClass.setCallback = function(callback) {
	this.sync = true;
	this.callback = callback;
	return this;
};

module.exports.ContextClass.async = function() {
	this.sync = false;
	return this.callback;
};

module.exports.ContextClass.stop = function() {
	this.stopped = true;
	if (this.sync) {
		throw new StopException('stop');
	} else {
		var callback = this.async();
		callback(true);
	}
};