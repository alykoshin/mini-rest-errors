'use strict';

var http = require('http');
var statusCodes = http.STATUS_CODES;

var constructError = require('./constructError');


var statusByReasonPhrase = function(reasonPhrase) {
	return statusCodes[reasonPhrase];
};


var DEFAULT_STATUS = 500;
var DEFAULT_MESSAGE = 'Internal Server Error';

/*
 var HTTPErrorConstructor = constructError('HTTPError', Error, {
 status: function() {
 return this.status || DEFAULT_STATUS;
 },
 message: function() {
 return http.STATUS_CODES[this.status] || this.message || DEFAULT_MESSAGE;
 }
 }, null);



 var HTTPError = function(status, message) {

 var res =  HTTPErrorConstructor({
 message: message || http.STATUS_CODES[status] || DEFAULT_MESSAGE,
 status: status || DEFAULT_STATUS
 },
 HTTPError
 );

 return res;
 };
 */

var HTTPError = constructError(
	'HTTPError',
	Error, {
		status: DEFAULT_STATUS,
		message: DEFAULT_MESSAGE
	},
	function( /* arguments */ ) {
		//console.log('HTTPError: arguments:', arguments);
		var context = arguments[3] || HTTPError;
		var options = arguments[2] || {};
		options.status  = arguments[0] || options.status; //  || DEFAULT_STATUS;
		options.message = arguments[1] || options.message || http.STATUS_CODES[options.status]; //  || DEFAULT_MESSAGE;

		return {
			options: options,
			context: context,
			args: [ options, context ] // Parameters for ErrorConstructor
		};
	},
	null
);


//var HTTPError = HTTPErrorConstructor;

module.exports = HTTPError;
//module.exports.constructor = HTTPErrorConstructor;
