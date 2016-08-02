/* globals describe, before, beforeEach, after, afterEach, it */

'use strict';

var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;

var statusCodes = require('http').STATUS_CODES;

var miniRestErrors = require('../');
var HTTPError = miniRestErrors.HTTPError;


// chai.should();
//http://chaijs.com/plugins/chai-things
// chai.use(require('chai-things'));

describe('# HTTPError', function () {


  it('# check class properties', function () {
    expect(HTTPError).to.be.a('function');
    expect(HTTPError).to.have.ownProperty('displayName');
  });


  it('# check basic properties', function () {
    var status = 400;
    var message = statusCodes[status];

    var httpError = new HTTPError(status);

    expect(httpError).to.be.an('object');
    expect(httpError).to.be.instanceof(Error);
    expect(httpError).to.be.instanceof(HTTPError);

    expect(httpError).to.have.property('name');
    expect(httpError).to.have.ownProperty('status');
    expect(httpError).to.have.ownProperty('message');
    expect(httpError).to.have.ownProperty('stack');

    expect(httpError.name).equals('HTTPError');
    expect(httpError.status).equals(status);
    expect(httpError.message).equals(message);
  });


  it('# construct with custom message', function () {
    var status = 400;
    var message = 'custom message';

    var httpError = new HTTPError(status, message);

    expect(httpError.status).equals(status);
    expect(httpError.message).equals(message);
  });


});
