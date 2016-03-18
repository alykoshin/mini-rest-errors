/**
 * Created by alykoshin on 06.03.16.
 */

var errors = {
  'notImplemented': {
    status:  500,
    // use default message
  },
  'unknownError': {
    status:  500,
    // use default message
  },
  'badRequest': { // Invalid request from client
    status: 400,
  },
  'pageNotFound': {
    status:  404,
    // use default message
  }
};


module.exports = errors;
