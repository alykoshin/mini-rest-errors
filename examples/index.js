/**
 * Created by alykoshin on 08.03.16.
 */

'use strict';

var appErrors = require('../').appErrors;
var AppError = require('../').AppError;
var HTTPError = require('../').HTTPError;

console.log('\n* HTTPError Example 1\n');

var httpError = new HTTPError(400);
console.log('httpError:', httpError);
console.log('httpError.stack:', httpError.stack);

console.log('\n* HTTPError Example 2\n');

var httpError = new HTTPError(400, 'This message overrides default');
console.log('httpError:', httpError);
console.log('httpError.stack:', httpError.stack);

console.log('\n* AppError Example 1\n');

var appError = new AppError('notImplemented');
console.log('appError:', appError);
console.log('appError.stack:', appError.stack);

console.log('\n* AppError Example 2\n');

var appError = new AppError('notImplemented', 'more data');
console.log('appError:', appError);
console.log('appError.stack:', appError.stack);

console.log('\n* AppError Example 3\n');

appErrors.newAppError = {
  status: 500,
  message: 'newAppError Message'
};

var appError = new AppError('newAppError', 'more data');
console.log('appError:', appError);
console.log('appError.stack:', appError.stack);

