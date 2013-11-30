/**
 * Synchronous Execution Context
 *
 */

var StopException = require('../errors/stop-exception');

module.exports = require('./context');

module.exports.ContextClass.stop = function() {
	this.stopped = true;
	throw new StopException('stop');
};
