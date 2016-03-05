var util = require( 'util' );
var _ = require('lodash');
//var verror = require( 'verror' );


function propDefault(target, source, prop) {
	if (typeof source[prop] !== 'function') {
		target[ prop ] = (target[prop] && typeof target[prop] !== 'function') ? target[ prop ] : source[ prop ];
	}
}

function fnResDefault(target, source, prop) {
	if (typeof source[prop] === 'function') {
		target[ prop ] = (target[prop] && typeof target[prop] !== 'function') ? target[ prop ] : source[ prop ].call(target);
		//this[ prop ] = this[ prop ] || defaults[ prop ].call(this);
	}
}

function objDefault(fn, target /*, source,...*/) {
	var prop;
	for (var len=arguments.length,i=2; i<len; ++i) {
		var source = arguments[i];
		for (prop in source) {
			if (source.hasOwnProperty(prop)) {
				fn(target, source, prop);
			}
		}
	}
}

// Idea based on https://github.com/restify/errors/blob/master/lib/index.js
function constructError(name, ParentErrorClass, defaults, preprocessFn, origContext) {
	//assert.string(name, 'name');
	//assert.optionalObject(defaults, 'defaults');

	ParentErrorClass = ParentErrorClass || Error; //verror.WError; //Error;

	// code property doesn't ends with 'Error'; remove it.
	var defaultCode = name.replace(new RegExp('[Ee]rror$'), '');
	var DEFAULT_MESSAGE = 'Unknown Error';

	var baseProps = {
		name: name,
		code: (defaults && defaults.code) || defaultCode,
	};
	var d = _.assign({}, baseProps, defaults);

	// dynamically create a constructor.
	// must be anonymous fn.
	/**
	 *
	 * @param arguments
	 * @constructor
   */
	var ErrorConstructor = function( /* arguments */ ) {
		var callee = arguments.callee; // arguments.callee not accessible in strict mode
		var caller = ErrorConstructor.caller;

		var args, options, context;
		args = Array.prototype.slice.call(arguments);
		//console.log('ErrorConstructor: arguments:', arguments);
		//console.log('ErrorConstructor: args:', args);
		if (typeof preprocessFn === 'function') {
			//args = preprocessFn.apply(this, args);
			var tmp = preprocessFn.apply(this, args);
			options = tmp.options;
			args = tmp.args;
			context = tmp.context;
		} else {
			options = typeof args[ 0 ] === 'string' ? { message: args[ 0 ]} : args[0];
		}
		//var options          = typeof args[ 0 ] === 'string' ? { message: args[ 0 ]} : args[0];
		//var constructContext = args[ 1 ];

		//console.log('options:', options, '; typeof constructContext:', typeof constructContext);

		// call super
		if (ParentErrorClass === Error) {
			Error.call(this, options.message || DEFAULT_MESSAGE);

			//console.log(
			//	'1.options.message:', options.message,
			//	'this.message:', this.message,
			//	', this.message():', ( (typeof this.message === 'function') ? ( this.message() ) : 'not-a-function')
			//);

		} else if ((typeof verror !== 'undefined') && (ParentErrorClass === verror.WError)) {
			// So far no specific WError handling implemented
			ParentErrorClass.apply(this, options.message || DEFAULT_MESSAGE);

		} else {
			// Assuming arguments for the class under construction are same as for ParentErrorClass
			ParentErrorClass.apply(this, args);
		}

		// Creates the this.stack getter
		//console.log('captureStackTrace: context:', context);
		//console.log('captureStackTrace: origContext:', origContext);
		//console.log('captureStackTrace: caller:', caller);
		//console.log('captureStackTrace: callee:', callee);
		//console.log('captureStackTrace: this.constructor:', this.constructor);
		Error.captureStackTrace(this, context || origContext || caller || this.constructor);

		// Some properties (i.e. message) is already assigned by super - need to save them
		//console.log('propDefault:', propDefault);
		//console.log('this:', this);
		//console.log('defaults:', defaults);
		//console.log('options:', options);
		//objDefault(propDefault, this, defaults, options);
		// When static properties are assigned, assign functions
		//objDefault(fnResDefault, this, defaults, options);

		//console.log('3.options.message:', options.message, 'this.message:', this.message, ', this.message():', typeof this.message === 'function' && this.message());

		_.assign(this, options);
		_.defaults(this, defaults);
	};
	util.inherits(ErrorConstructor, ParentErrorClass);

	// copy over all options to prototype
	//_.assign(ErrorConstructor.prototype, d);
	//ErrorConstructor.prototype.message = d.message;
	ErrorConstructor.prototype.name = d.name;

	// assign display name
	ErrorConstructor.displayName = name;

	// store constructor on main exports
	return ErrorConstructor;
}


module.exports = constructError;
