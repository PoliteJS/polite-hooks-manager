/**
 * forwarder to the `/src` folder source file
 */

var PoliteHooksManager = require('./src/polite-hooks-manager');


/**
 * Expose the singleton instance to the whole module.
 *
 * By requiring the whole module as dependency you gain access
 * to a singleton instance of the hooks manager.
 *
 * You can use it directly to register or call hooks logic.
 *
 * ```
 * require('polite-hooks-manager').register(...);
 * require('polite-hooks-manager').run(...);
 * ```
 *
 */
module.exports = PoliteHooksManager.create();


/**
 * Expose a way to create new instances explicitly.
 *
 * It should be used to create dedicated repositories of
 * hooks from an application perspective.
 */
module.exports.getNewInstance = function() {
	return PoliteHooksManager.create();
};
