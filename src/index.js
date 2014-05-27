//     JqueryPipe
//     (c) simonfan
//     JqueryPipe is licensed under the MIT terms.

/**
 * AMD module.
 *
 * @module JqueryPipe
 */

define(function (require, exports, module) {
	'use strict';

	var _              = require('lodash'),
		$              = require('jquery'),
		pipe           = require('pipe'),
		jqueryMetaData = require('jquery-meta-data');

	var msSplitter = /\s*:\s*/g;

	/**
	 * Parses a string into methodName and args.
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	function parseMethodString(str) {

		var tokens = str.split(msSplitter);

		var method = tokens.shift();

		return {
			method: method,
			args  : tokens
		};
	}

	var jqPipe = module.exports = pipe.extend({


		initialize: function initializeJqPipe(el, options) {




			// set default options
			options = options || {};
			options.destination = el;
			// set default source to a new object
			options.source = options.source || {};

			// lines
			// set metadata options default values
			_.defaults(options, this.metaDataOptions);

			var lines = el.metaData(options);

			pipe.prototype.initialize.call(this, lines, options);
		},

		metaDataOptions: {
			prefix: 'pipe',
			parse: function parsePipeDestinations(destinations) {

				// split destinations string into array.
				return destinations.split(/\s*,\s*/g);
			},
		},

		/**
		 * Get from the jquery object
		 *
		 * @param  {[type]} $el [description]
		 * @param  {[type]} methodString        [description]
		 * @return {[type]}             [description]
		 */
		destGet: function destGet($el, methodString) {
			// arguments = [$el, methodString]
			var parsed = parseMethodString(methodString);

			return $el[parsed.method].apply($el, parsed.args);
		},

		/**
		 * Set to the jquery object
		 * @param  {[type]} $el [description]
		 * @param  {[type]} methodString        [description]
		 * @param  {[type]} value       [description]
		 * @return {[type]}             [description]
		 */
		destSet: function destSet($el, methodString, value) {
			var parsed = parseMethodString(methodString),
				args   = parsed.args;

			args.push(value);

			return $el[parsed.method].apply($el, args);
		},

	});


	$.prototype.pipe = function jqueryPipe(options) {
		return jqPipe(this, options);
	};
});
