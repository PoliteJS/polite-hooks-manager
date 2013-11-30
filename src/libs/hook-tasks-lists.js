/**
 * Receive an hook configuration object with with compose a list of
 * sorted tasks to run in sequence.
 *
 * !!! this logic is executed before every runnable method !!!
 */

module.exports = function(hookConfig) {

	var list = [];

	var data = {
		fn: [],
		before: [],
		after: []
	}

	for (var callbackId in hookConfig) {
		list.push(hookConfig[callbackId]);
	};

	// this is the point where "higher priority come first" logic is implemented!
	list.sort(function(a, b) {
		return a.priority < b.priority;
	});

	// distribute implementation
	list.forEach(function(item) {
		data.fn.push(item.fn);
		if (item['before']) {
			data.before.push(item['before']);
		}
		if (item['after']) {
			data.after.push(item['after']);
		}
	});

	return data;
};