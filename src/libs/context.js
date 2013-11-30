
var ContextClass = {};

ContextClass.init = function(context) {
	this.context = context;
	this.stopped = false;
	return this;
};

ContextClass.setContext = function(context) {
	this.context = context;
	return this;
};

ContextClass.getContext = function() {
	return this.context;
};

ContextClass.stop = function() {
	this.stopped = true;
};

ContextClass.hasStopped = function() {
	return this.stopped;
};


module.exports.ContextClass = ContextClass;

module.exports.create = function() {
	var context = Object.create(this.ContextClass);
	return context.init.apply(context, arguments);
};
