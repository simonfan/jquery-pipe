(function(name, factory) {

	var mod = typeof define !== 'function' ?
		// node
		'.././src' :
		// browser
		'jquery-pipe',
		// dependencies for the test
		deps = [mod, 'should', 'jquery'];

	if (typeof define !== 'function') {
		// node
		factory.apply(null, deps.map(require));
	} else {
		// browser
		define(deps, factory);
	}

})('test', function(jqPipe, should, $) {
	'use strict';

	describe('jqPipe basics', function () {
		beforeEach(function () {

			var html =
				['<a',
					'href="#"',
					'data-pipe-top="css:top, data:top"',

					'data-pipe-url="attr:href, data:url"',

				'></a>'].join(' ');

			this.$fixture = $(html).appendTo($('body'));

		});

		afterEach(function () {
			this.$fixture.remove();
		});

		it('pumpTo jquery element', function (testdone) {

			var $fixture = this.$fixture;

			var toFixture = $fixture.pipe();

			toFixture.inject({
				top: '100px',
				url: 'banana',
			})
			.then(function () {


				$fixture.css('top').should.eql('100px');
				$fixture.attr('href').should.eql('banana');


				var source = {};

				toFixture.from(source);

				source.top = '200px';
				source.url = 'another';

				return toFixture.pump();

			})
			.then(function () {

				$fixture.css('top').should.eql('200px');
				$fixture.attr('href').should.eql('another');

				testdone();
			})
			.done();

		});

		it('drainFrom jquery element', function (testdone) {
			var $fixture = this.$fixture;

			$fixture.attr('href', 'some-url');
			$fixture.css('top', '235px');

			var toFixture = $fixture.pipe();

			var source = {};

			toFixture
				.from(source)
				.drain()
				.then(function () {

					source.top.should.eql('235px');
					source.url.should.eql('some-url');

					testdone();
				})
				.done();
		})
	});
});
