import qs from 'qs';

import { RouteParams } from '@/types/api';

export function buildParams(path: string, params: RouteParams = {}): string {
	for (const [key, value] of Object.entries(params)) {
		const keyMark = `:${key}`;

		if (path.indexOf(keyMark) !== -1) {
			path = path.replace(keyMark, normalize(value));
			delete params[key];
		}
	}

	const query = qs.stringify(params);

	return path + (query ? `?${query}` : '');
}

export function cleanPath(path: string): string {
	return path.replace(/^\/+|\/+$/g, '');
}

function normalize(value: boolean | number | string | object): string {
	switch (typeof value) {
		case 'string':
			return value;

		case 'number':
			return value.toString();

		default:
			throw new Error(
				'Invalid type. Only numbers and strings can be inserted into a route path.'
			);
	}
}
