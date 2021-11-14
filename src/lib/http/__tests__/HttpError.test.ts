/**
 * @jest-environment jsdom
 */

import HttpError from '../HttpError';

describe('HttpError', () => {
	let httpError: HttpError;

	beforeEach(() => {
		httpError = new HttpError(400, 'Everything is on fire');
	});

	it('has a status set by the constructor', () => {
		expect(httpError.status).toBe(400);
	});

	it('has a message set by the constructor', () => {
		expect(httpError.message).toBe('Everything is on fire');
	});
});
