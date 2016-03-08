[![npm version](https://badge.fury.io/js/mini-rest-errors.svg)](http://badge.fury.io/js/mini-rest-errors)
[![Build Status](https://travis-ci.org/alykoshin/mini-rest-errors.svg)](https://travis-ci.org/alykoshin/mini-rest-errors)
[![Coverage Status](https://coveralls.io/repos/alykoshin/mini-rest-errors/badge.svg?branch=master&service=github)](https://coveralls.io/github/alykoshin/mini-rest-errors?branch=master)
[![Code Climate](https://codeclimate.com/github/alykoshin/mini-rest-errors/badges/gpa.svg)](https://codeclimate.com/github/alykoshin/mini-rest-errors)
[![Inch CI](https://inch-ci.org/github/alykoshin/mini-rest-errors.svg?branch=master)](https://inch-ci.org/github/alykoshin/mini-rest-errors)

[![Dependency Status](https://david-dm.org/alykoshin/mini-rest-errors/status.svg)](https://david-dm.org/alykoshin/mini-rest-errors#info=dependencies)
[![devDependency Status](https://david-dm.org/alykoshin/mini-rest-errors/dev-status.svg)](https://david-dm.org/alykoshin/mini-rest-errors#info=devDependencies)


# mini-rest-errors

Error objects for `mini-rest` project


If you have different needs regarding the functionality, please add a [feature request](https://github.com/alykoshin/mini-rest-errors/issues).


## Installation

```sh
npm install --save mini-rest-errors
```

## Usage

### `HTTPError`

### Inherits Error

### Constructor `HTTPError = new (status, message)`

- `status` {Number} - HTTP Status Code (see [appErrors](#appErrors) section)
- `message` {String} - Error message to override default HTTP Error Message based on status code value (according to `http.STATUS_CODES`) (optional)

### Properties

- `status`  - HTTP status code as set in constructor
- `message` - HTTP error message as set in constructor or defined in `http.STATUS_CODES`
- `stack`   - Error stack inherited from `Error`

### `AppError`

#### Inherits HTTPError

#### Constructor `AppError = new(code, details)`

- `code` {String}    - Error code (see [appErrors](#appErrors) section)
- `details` {String} - Error details (optional)

- `code`     - Error code as set in constructor
- `status`   - HTTP status code as defined in `appErrors`
- `message`  - Error message as defined in `appErrors`
- `details`  - Error details as set in constructor 
- `stack`    - Error stack inherited from `Error`



exported



### constructError

## Example

examples/index.js

```js
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
```

```
$ node examples/index.js 
```

```
* HTTPError Example 1

httpError: { [HTTPError: Bad Request] status: 400, message: 'Bad Request' }
httpError.stack: HTTPError: Bad Request
    at Object.<anonymous> (<...>/mini-rest-errors/examples/index.js:13:17)
    at Module._compile (module.js:413:34)
    at Object.Module._extensions..js (module.js:422:10)
    at Module.load (module.js:357:32)
    at Function.Module._load (module.js:314:12)
    at Function.Module.runMain (module.js:447:10)
    at startup (node.js:139:18)
    at node.js:999:3

* HTTPError Example 2

httpError: { [HTTPError: This message overrides default] status: 400, message: 'This message overrides default' }
httpError.stack: HTTPError: This message overrides default
    at Object.<anonymous> (<...>/mini-rest-errors/examples/index.js:19:17)
    at Module._compile (module.js:413:34)
    at Object.Module._extensions..js (module.js:422:10)
    at Module.load (module.js:357:32)
    at Function.Module._load (module.js:314:12)
    at Function.Module.runMain (module.js:447:10)
    at startup (node.js:139:18)
    at node.js:999:3

* AppError Example 1

appError: { [AppError: Internal Server Error]
  details: '',
  code: 'notImplemented',
  status: 500,
  message: 'Internal Server Error' }
appError.stack: AppError: Internal Server Error
    at Object.<anonymous> (<...>/mini-rest-errors/examples/index.js:25:16)
    at Module._compile (module.js:413:34)
    at Object.Module._extensions..js (module.js:422:10)
    at Module.load (module.js:357:32)
    at Function.Module._load (module.js:314:12)
    at Function.Module.runMain (module.js:447:10)
    at startup (node.js:139:18)
    at node.js:999:3

* AppError Example 2

appError: { [AppError: Internal Server Error]
  details: 'more data',
  code: 'notImplemented',
  status: 500,
  message: 'Internal Server Error' }
appError.stack: AppError: Internal Server Error
    at Object.<anonymous> (<...>/mini-rest-errors/examples/index.js:31:16)
    at Module._compile (module.js:413:34)
    at Object.Module._extensions..js (module.js:422:10)
    at Module.load (module.js:357:32)
    at Function.Module._load (module.js:314:12)
    at Function.Module.runMain (module.js:447:10)
    at startup (node.js:139:18)
    at node.js:999:3

* AppError Example 3

appError: { [AppError: newAppError Message]
  details: 'more data',
  code: 'newAppError',
  status: 500,
  message: 'newAppError Message' }
appError.stack: AppError: newAppError Message
    at Object.<anonymous> (<...>/mini-rest-errors/examples/index.js:42:16)
    at Module._compile (module.js:413:34)
    at Object.Module._extensions..js (module.js:422:10)
    at Module.load (module.js:357:32)
    at Function.Module._load (module.js:314:12)
    at Function.Module.runMain (module.js:447:10)
    at startup (node.js:139:18)
    at node.js:999:3
```

## Predefined appErrors

```
{
  'notImplemented': {
    status:  500,
    // use default message
  },
  'unknownError': {
    status:  500,
    // use default message
  },
  'badRequest': {        // Invalid request from client / external entity
    status: 400,
  },
  'pageNotFound': {
    status:  404,
    // use default message
  },
  
  'clientNotFound': {
    status:  404,
    message: 'Client Not Found'
  },
  'multipleClientFound': {
    status: 501,
    message: 'Multiple Clients Found'
  },
  'multipleClientRequests': {
    status: 501,
    message: 'Got a request from client when I already have one'
  },
  'validationFailed': {  // Database data validation failed
    status: 500,
    message: 'Data Validation Failed'
  }
}  
```


## Credits
[Alexander](https://github.com/alykoshin/)


# Links to package pages:

[github.com](https://github.com/alykoshin/mini-rest-errors) &nbsp; [npmjs.com](https://www.npmjs.com/package/mini-rest-errors) &nbsp; [travis-ci.org](https://travis-ci.org/alykoshin/mini-rest-errors) &nbsp; [coveralls.io](https://coveralls.io/github/alykoshin/mini-rest-errors) &nbsp; [inch-ci.org](https://inch-ci.org/github/alykoshin/mini-rest-errors)


## License

MIT
