/**
 * Created by alykoshin on 19.04.17.
 */

const AppError = require('../').AppError;


console.log('\nError without parameters');

let e1 = new AppError();
console.log(e1);


console.log('\nError with unknownError code');

let e2 = new AppError('unknownError', 'some details');
console.log(e2);

