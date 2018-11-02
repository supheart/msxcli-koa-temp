var CustomError = function (message, error) {
	Error.call(this, message);
	if (Error.captureStackTrace) {
		Error.captureStackTrace(this, this.constructor);
	}
	this.name = 'CustomError';
	this.message = message;
	if (error) this.inner = error;
};

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

module.exports = CustomError;