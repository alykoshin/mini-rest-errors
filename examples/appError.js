/**
 * Created by alykoshin on 08.03.16.
 */

'use strict';

// var appErrors = require('../').appErrors;
var AppError = require('../').AppError;
var HTTPError = require('../').HTTPError;
var util = require('util');



console.log('*******************************************************************');
console.log('\n* AppError Example 1\n');

var appError = new AppError('notImplemented');
console.log('appError:', appError);
console.log('appError.stack:', appError.stack);


console.log('*******************************************************************');
console.log('\n* AppError Example 2\n');

var appError = new AppError('notImplemented', 'more data');
console.log('appError:', appError);
console.log('appError.stack:', appError.stack);


console.log('*******************************************************************');
console.log('\n* AppError Example 3\n');

AppError.errors({
  newAppError: {
    status:  500,
    message: 'newAppError Message'
  }
});

var appError = new AppError('newAppError', 'more data');
console.log('appError:', appError);
console.log('appError.name:', appError.name);
console.log('typeof appError:', typeof appError);
console.log('appError instanceof Error:', appError instanceof Error);
console.log('appError instanceof HTTPError:', appError instanceof HTTPError);
console.log('appError instanceof AppError:', appError instanceof AppError);
console.log('util.inspect(appError):', util.inspect(appError));
console.log('JSON.stringify(appError,null,2):', JSON.stringify(appError,null,2));
console.log('appError.toString():', appError.toString());
console.log('\'\'+appError:', '' + appError);
console.log('appError.stack:', appError.stack);


AppError.errors({
  newAppError2: {
    id:      12345,
    status:  500,
    message: 'newAppError2 Message'
  }
});

console.log('*******************************************************************');
console.log('\n* AppError Example 2 (id field)\n');

var appError2 = new AppError('newAppError2', 'more data');
console.log('appError2:', appError2);

console.log('*******************************************************************');
process.env.NODE_ENV = 'development';
console.log('Expecting stack output for when process.env.NODE_ENV === \'development\'')
console.log('appError2.toString():' + appError2.toString());
