/* globals describe, before, beforeEach, after, afterEach, it */

'use strict';

var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var miniRestErrors = require('../');

var defaultErrors = require('../').appErrors;
var HTTPError = miniRestErrors.HTTPError;
var AppError = miniRestErrors.AppError;

var statusCodes = require('http').STATUS_CODES;

// chai.should();
//http://chaijs.com/plugins/chai-things
// chai.use(require('chai-things'));

describe('# AppError', function () {


  it('# check class properties', function () {
    expect(AppError).to.be.a('function');
    expect(AppError).to.have.ownProperty('displayName');
  });


  it('# able to add new error definitions', function () {
    var code            = 'testError';
    var errorDefinition = {};
    errorDefinition[code] = {
      message: 'test error message',
      status:  123,
      id:      1234
    };
    // add to error definitions
    AppError.errors(errorDefinition);

    expect(AppError.errors()).has.property(code);
    expect(AppError.errors()[code]).eql(errorDefinition[code]);
  });


  describe('# basic properties', function () {
    var code = 'testError';
    var details = 'custom error details';
    var errorDefinition = {};
    errorDefinition[code] = {
      message: 'test error message',
      status:  123,
      id:      1234
    };
    // add to error definitions
    AppError.errors(errorDefinition);

    // construct an error
    var appError = new AppError(code, details);

    it('# typeof', function () {
      expect(appError).to.be.an('object');
    });

    it('# instanceof', function () {
      expect(appError).to.be.instanceof(Error);
      expect(appError).to.be.instanceof(HTTPError);
      expect(appError).to.be.instanceof(AppError);
    });

    it('# properties exist', function () {
      expect(appError).to.have.property('name');
      expect(appError).not.to.have.ownProperty('name');
      expect(appError).to.have.ownProperty('status');
      expect(appError).to.have.ownProperty('details');
      expect(appError).to.have.ownProperty('message');
      expect(appError).to.have.ownProperty('stack');
    });

    it('# properties have correct values', function () {
      console.log(appError);
      expect(appError.name).equals('AppError');
      expect(appError.id).equals(errorDefinition[code].id);
      expect(appError.status).equals(errorDefinition[code].status);
      expect(appError.details).equals(details);
      expect(appError.message).equals(errorDefinition[code].message);
    });
  });


  it('# construct default error with default details', function () {
    var code = 'unknownError';
    var id = AppError.errors()[code].id;
    var status = AppError.errors()[code].status;
    var message = statusCodes[status];  // for `unknownError` it is inherited from HTTPError

    var appError = new AppError(code);

    expect(appError.code).equals(code);
    expect(appError.id).equals(id);
    expect(appError.status).equals(status);
    expect(appError.message).equals(message);
  });

  it('# construct default error with custom details', function () {
    var code = 'unknownError';
    var id = AppError.errors()[code].id;
    var status = AppError.errors()[code].status;
    var message = statusCodes[status];  // for `unknownError` it is inherited from HTTPError
    var details = 'custome error message';

    var appError = new AppError(code, details);

    expect(appError.code).equals(code);
    expect(appError.id).equals(id);
    expect(appError.status).equals(status);
    expect(appError.details).equals(details);
    expect(appError.message).equals(message);
  });


});
