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
};


module.exports = errors;
