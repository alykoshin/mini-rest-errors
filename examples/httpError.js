/**
 * Created by alykoshin on 08.03.16.
 */

'use strict';


var HTTPError = require('../').HTTPError;
var util = require('util');
var httpError;

console.log('*******************************************************************');
console.log('*\n* HTTPError with default message\n*');
console.log('*******************************************************************');

httpError = new HTTPError(400);
console.log('httpError:');
console.log(httpError);
console.log('*******************************************************************');
console.log('httpError.stack:');
console.log(httpError.stack);


console.log('*******************************************************************');
console.log('*\n* HTTPError with custom message\n*');

httpError = new HTTPError(400, 'This message overrides default');
console.log('*******************************************************************');
console.log('httpError.name: \'' + httpError.name + '\'');
console.log('*******************************************************************');
console.log('(typeof httpError): \'' + typeof httpError + '\'');
console.log('*******************************************************************');
console.log('(httpError instanceof Error):', httpError instanceof Error);
console.log('*******************************************************************');
console.log('(httpError instanceof HTTPError):', httpError instanceof HTTPError);
console.log('*******************************************************************');
console.log('httpError:');
console.log(httpError);
console.log('*******************************************************************');
console.log('httpError.stack:');
console.log(httpError.stack);
console.log('*******************************************************************');
console.log('util.inspect(httpError):');
console.log(util.inspect(httpError));
console.log('*******************************************************************');
console.log('JSON.stringify(httpError,null,2):');
console.log(JSON.stringify(httpError,null,2));
console.log('*******************************************************************');
console.log('httpError implicit conversion to string:');
console.log('' + httpError + '');
console.log('*******************************************************************');
console.log('httpError.toString():');
console.log(httpError.toString());
console.log('*******************************************************************');
