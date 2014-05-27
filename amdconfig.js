require.config({
	urlArgs: 'bust=0.6569370329380035',
	baseUrl: '/src',
	paths: {
		requirejs: '../bower_components/requirejs/require',
		text: '../bower_components/requirejs-text/text',
		mocha: '../node_modules/mocha/mocha',
		should: '../node_modules/should/should',
		'jquery-pipe': 'index',
		jquery: '../bower_components/jquery/dist/jquery',
		lodash: '../bower_components/lodash/dist/lodash.compat',
		pipe: '../bower_components/pipe/built/pipe',
		q: '../bower_components/q/q',
		qunit: '../bower_components/qunit/qunit/qunit',
		'requirejs-text': '../bower_components/requirejs-text/text',
		subject: '../bower_components/subject/built/subject',
		underscore: '../bower_components/underscore/underscore',
		'jquery-meta-data': '../bower_components/jquery-meta-data/built/jquery-meta-data'
	},
	shim: {
		backbone: {
			exports: 'Backbone',
			deps: [
				'jquery',
				'underscore'
			]
		},
		underscore: {
			exports: '_'
		},
		mocha: {
			exports: 'mocha'
		},
		should: {
			exports: 'should'
		}
	}
});
