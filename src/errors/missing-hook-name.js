/**
 * Polite Hooks Manager
 * --- CUSTOM ERROR ---
 */

function CustomError(message) {
	Error.call(this);
	Error.captureStackTrace(this, this.constructor);

	this.name = "phm-missing-hook-name";
	this.message = (message || "");
}


CustomError.prototype = new Error();
CustomError.prototype.constructor = CustomError;

module.exports = CustomError;