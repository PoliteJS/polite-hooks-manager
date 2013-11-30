/**
 * REGISTER / UNREGISTER
 * (responsability library)
 */

// Global Dependencies
var extend = require('extend');


// Custom Errors
var MissingHookNameError = require('./errors/missing-hook-name');
var MissingHookFnError = require('./errors/missing-hook-fn');





/**
 * Add a callback configuration to the store
 * @param item
 * @returns {PoliteHookManager}
 */
module.exports.register = function(item, arg1) {

	if (typeof item == 'string') {
		item = {name:item};
		if (arg1) {
			item['fn'] = arg1;
		}
	}

	item = extend({
		id: generateCallbackUid(),
		group: '',
		priority: this.defaultPriority
	}, item);

	if (!item.name) {
		throw new MissingHookNameError('you can\'t register a callback without an hook name!');
	}

	if (!item.fn || typeof item.fn !== 'function') {
		throw new MissingHookFnError('you can\'t register a callback without give an implementation!');
	}

	// create the hook collector
	if (!this.store[item.name]) {
		this.store[item.name] = {};
	}

	// add full item to the store identified by "hook/id"
	this.store[item.name][item.id] = item;

	return this;
};


/**
 * Remove an entire hook registered callbacks or remove selective
 * by callback id.
 */
module.exports.unregister = function(hookName, id) {

	if (!hookName) {
		throw new MissingHookNameError('you can\'t call "unregister()"  without an hook name!');
	}

	if (this.store[hookName] && this.store[hookName][id]) {
		delete(this.store[hookName][id]);
	} else if (this.store[hookName]) {
		delete(this.store[hookName]);
	}

	return this;
};


/**
 * Remove all callbacks identified by a group through many hook names
 */
module.exports.unregisterGroup = function(groupName) {
	groupName = groupName || '';
	for (var hookName in this.store) {
		var countProp = 0;
		for (var callbackId in this.store[hookName]) {
			countProp++;
			if (this.store[hookName][callbackId]['group'] == groupName) {
				delete(this.store[hookName][callbackId]);
				countProp--;
			}
		}
		// remove empty hooks containers
		if (countProp == 0) {
			delete(this.store[hookName]);
		}
	}
	return this;
};






// --------------------------------------------- //
// ---[[   P R I V A T E   M E T H O D S   ]]--- //
// --------------------------------------------- //

// http://www.ietf.org/rfc/rfc4122.txt
function generateCallbackUid() {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
	s[8] = s[13] = s[18] = s[23] = "-";

	var uuid = s.join("");
	return uuid;
}


