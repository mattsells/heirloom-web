import { route } from '../routing';

describe('route()', () => {
	it('inserts a single param into the url', () => {
		const path = '/test/:foo';
		const params = { foo: 'bar' };

		expect(route(path, params)).toBe('/test/bar');
	});

	it('inserts multiple params into the url', () => {
		const path = '/test/:foo/:bar';
		const params = { foo: 'bar', bar: 'baz' };

		expect(route(path, params)).toBe('/test/bar/baz');
	});

	it.each([[true], [false], [{}], [null], [undefined]])(
		'throws an error if the path variable is %p',
		(value) => {
			const path = '/test/:foo';

			expect(() => route(path, { foo: value })).toThrowError();
		}
	);

	it('appends unmarked params as the query string', () => {
		const path = '/test';
		const params = { foo: 'bar', bar: 'baz' };

		expect(route(path, params)).toBe('/test?foo=bar&bar=baz');
	});

	it('full formats the path', () => {
		const path = '/test/:foo';
		const params = { foo: 'bar', bar: 'baz' };

		expect(route(path, params)).toBe('/test/bar?bar=baz');
	});
});
