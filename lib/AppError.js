'use strict';

var _ = require('lodash');

//var statusCodes = require('http').STATUS_CODES;
var constructError = require('./constructError');
var HTTPError = require('./HTTPError');
var appErrors = require('./appErrors');


var DEFAULT_ID = 1;
var DEFAULT_CODE = 'unknownError';    // undefined
var DEFAULT_DETAILS = ''; // undefined

//var AppErrorConstructor = constructError('AppError', HTTPErrorConstructor, {
/*
var AppErrorConstructor = constructError('AppError', HTTPError.constructor, {
	code:    DEFAULT_CODE,
	details: DEFAULT_DETAILS
}, null);


var AppError = function (code, details) {
	var status  = errors[ code ] && errors[ code ].status;
	var message = errors[ code ] && errors[ code ].message;

	return new AppErrorConstructor({
		message: message,
		code: code,
		status: status,
		details: details
	});

};
*/
var AppError = constructError(
	'AppError',
	HTTPError, {
    id: DEFAULT_ID,
    details: DEFAULT_DETAILS,
		code: DEFAULT_CODE
	},
	function( /* arguments */ ) {
		//console.log('AppError: arguments:', arguments);
		var context       = arguments[3];
		var options       = arguments[2] || {};
		options.details   = arguments[1] || options.detail; // || DEFAULT_DETAILS;
		options.code      = arguments[0] || options.code;   // || DEFAULT_CODE;
    options.id        = appErrors[ options.code ] && appErrors[ options.code ].id        || options.id;
		options.status    = appErrors[ options.code ] && appErrors[ options.code ].status    || options.status;
		options.message   = appErrors[ options.code ] && appErrors[ options.code ].message   || options.message;
		options.level     = appErrors[ options.code ] && appErrors[ options.code ].level     || options.level     || 'error';

		// set hideStack property only if it was defined for this error somewhere before
		const hideStack   = appErrors[ options.code ] && appErrors[ options.code ].hideStack || options.hideStack;
		if (typeof hideStack !== 'undefined') options.hideStack = hideStack;

		return {
			options: options,
			context: context,
			args:    [ options.status, options.message, options, context ] // Parameters for HTTPError
		};
	},
	null
);


AppError.errors = function(errorDefinitions) {
  return _.assign(appErrors, errorDefinitions);
};


module.exports = AppError;
