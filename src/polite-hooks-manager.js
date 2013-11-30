/**
 * Polite Hooks Manager
 * register and run hooks granting extendability
 *
 *
 *
 *
 * STORE:
 * ------
 *
 * It is the data structure who contains all registered hook callbacks.
 * the main pourpose is to store all `register()` arguments in a way they can be `unregister(hookName, id)`
 *
 * ```
 * store = {
 * 	 hookName: {
 * 	   registerId: {
 * 	     priority: 100,
 * 	     fn: function() {},
 * 	     ...
 * 	   }
 * 	 }
 * }
 * ```
 *
 *
 *
 *
 *
 * REGISTER NEW HOOK
 * -----------------
 *
 * ```
 * lib.register({
 *   name: 'hookName',
 *   id: '',
 *   group: '',
 *
 *   // higher values come first
 *   priority: 50,
 *
 *	 // callback implementation.
 *	 // should be both synchronous or asynchronous
 *   fn: function() {},
 *
 *	 // global hook synchronous callbacks
 *	 // being executed before/after asynchronous implementations.
 *   before: function() {},
 *   after: runction() {}
 * });
 * ```
 *
 * This is the short way to register a general callback.
 * priority, id, and group name are generated
 *
 * ```
 * lib.register('hookName', function() {});
 * ```
 *
 *
 */

// Global Dependencies
var extend = require('extend');

// Internal Dependencies
var PoliteHooksRegister = require('./register');
var PoliteHooksSyncRunner = require('./sync-runner');
var PoliteHooksAsyncRunner = require('./async-runner');





// ------------------------------------------------ //
// ---[[   C L A S S   D E F I N I T I O N   ]] --- //
// ------------------------------------------------ //

var PoliteHookManager = extend({},
	PoliteHooksRegister,
	PoliteHooksSyncRunner,
	PoliteHooksAsyncRunner
);

PoliteHookManager.init = function() {

	this.defaultPriority = 0;

	this.store = {};

	this.context = null;

	return this;

};

PoliteHookManager.setDefaultPriority = function(priority) {
	this.defaultPriority = priority;
};

PoliteHookManager.setContext = function(context) {
	this.context = context;
};







// ------------------------------------------- //
// ---[[   M O D U L E   E X P O R T S   ]]--- //
// ------------------------------------------- //

module.exports.class = PoliteHookManager;

module.exports.create = function() {
	var instance = Object.create(PoliteHookManager);
	return instance.init();
};




